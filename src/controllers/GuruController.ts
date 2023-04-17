import { Request, Response } from "express";
import Guru from "../db/models/Guru";
import argon2 from 'argon2';

enum JenisKelamin {
    LAKI_LAKI = 'L',
    PEREMPUAN = 'P'
}

interface GuruAttributes {
    id: number,
    nuptk: string,
    nama: string,
    jk: JenisKelamin,
    email: string,
    password: string,
    confPassword: string
}

export const getGuru = async(req: Request, res: Response):Promise<void> => {

    try {
        const response = await Guru.findAll();
        if (response.length !== 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({msg: 'Data masih kosong'});
        }

    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const getGuruById = async(req: Request, res:Response):Promise<void> => {

    try {

        const response = await Guru.findOne({
            attributes: ['nuptk', 'nama', 'jk', 'email'],
            where: {
                nuptk: req.params.id
            }
        });

        if (response !== null) {
            res.status(200).json(response);
        } else {
            res.status(404).json({msg: `Data guru tidak ditemukan`})
        }
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const createGuru = async (req:Request, res: Response): Promise<void> => {
    // define
    const {
        nuptk,
        nama,
        jk,
        email,
        password,
        confPassword,
    }: GuruAttributes = req.body;

    // password check match
    if (password !== confPassword) {
        res.status(400).json({msg: `Password dan konfirmasi password harus sesuai!`});
        return;
    } 
    if (password === "" || password === null || confPassword === "" || confPassword === null) {
        res.status(400).json({msg: `Masukkan password!`});
        return;
    } 
    // hash
    const hashPassword = await argon2.hash(password);
    
    try {
        await Guru.create({
            nuptk: nuptk,
            nama: nama,
            jk: jk,
            email: email,
            password: hashPassword
        });
        res.status(201).json({msg: `Register Berhasil!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}


export const updateGuru = async (req: Request, res: Response): Promise<void> =>{
    const guru = await Guru.findOne({
        where: {
            nuptk: req.params.id
        }
    })

    if (!guru) {
        res.status(404).json({msg: `Data guru tidak ditemukan`})
        return;
    }
        

    // define
    const {
        nuptk,
        nama,
        jk,
        email,
        password,
        confPassword,
    }: GuruAttributes = req.body;

    let hashPassword : string;

    if (password === "" || password === null) {
        hashPassword = guru.password;
    } else {
        hashPassword = await argon2.hash(password)
    }

    if (password !== confPassword) {
        res.status(400).json({msg: `Password dan konfirmasi password harus sesuai!`})
        return;
    }
    
    try {
        await Guru.update({
            nuptk: nuptk,
            nama: nama,
            jk: jk,
            email: email,
            password: hashPassword
        }, {
            where: {
                id: guru.id
            }
        })
        res.status(201).json({msg: `Data guru berhasil diupdate!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteGuru = async (req: Request, res: Response): Promise<void> => {
    const guru = await Guru.findOne({
        where: {
            nuptk: req.params.id
        }
    })

    if (!guru) {
        res.status(404).json({msg: `Data guru tidak ditemukan!`})
        return;
    }

    try {
        await Guru.destroy({
            where: {
                id: guru.id
            }
        })
        res.status(200).json({msg: `Data guru berhasil dihapus!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}