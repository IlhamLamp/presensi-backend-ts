import { Request, Response } from "express";
import Siswa from "../db/models/Siswa";
import argon2 from 'argon2';

enum JenisKelamin {
    LAKI_LAKI = 'L',
    PEREMPUAN = 'P'
}

interface SiswaAttributes {
    id: number,
    nisn: string,
    nama: string,
    jk: JenisKelamin,
    email: string,
    password: string,
    confPassword: string,
    tahunAjaranId: number,
    kelasId: number,
}

export const getSiswa = async(req: Request, res: Response):Promise<void> => {

    try {
        const response = await Siswa.findAll();
        if (response.length !== 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({msg: 'Data masih kosong'});
        }

    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const getSiswaById = async(req: Request, res:Response):Promise<void> => {

    try {

        const response = await Siswa.findOne({
            attributes: ['nisn', 'nama', 'jk', 'tahunAjaranId', 'kelasId'],
            where: {
                nisn: req.params.id
            }
        });

        if (response !== null) {
            res.status(200).json(response);
        } else {
            res.status(404).json({msg: `Data siswa tidak ditemukan`})
        }
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const createSiswa = async (req:Request, res: Response): Promise<void> => {
    // define
    const {
        nisn,
        nama,
        jk,
        email,
        password,
        confPassword,
        tahunAjaranId,
        kelasId
    }: SiswaAttributes = req.body;

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
        await Siswa.create({
            nisn: nisn,
            nama: nama,
            jk: jk,
            email: email,
            password: hashPassword,
            tahunAjaranId: tahunAjaranId,
            kelasId: kelasId
        });
        res.status(201).json({msg: `Register Berhasil!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}


export const updateSiswa = async (req: Request, res: Response): Promise<void> =>{
    const siswa = await Siswa.findOne({
        where: {
            nisn: req.params.id
        }
    })

    if (!siswa) {
        res.status(404).json({msg: `Data siswa tidak ditemukan`})
        return;
    }
        
    // define
    const {
        nisn,
        nama,
        jk,
        email,
        password,
        confPassword,
        tahunAjaranId,
        kelasId
    }: SiswaAttributes = req.body;

    let hashPassword : string;

    if (password === "" || password === null) {
        hashPassword = siswa.password;
    } else {
        hashPassword = await argon2.hash(password)
    }

    if (password !== confPassword) {
        res.status(400).json({msg: `Password dan konfirmasi password harus sesuai!`})
        return;
    }
    
    try {
        await Siswa.update({
            nisn: nisn,
            nama: nama,
            jk: jk,
            email: email,
            password: hashPassword,
            tahunAjaranId: tahunAjaranId,
            kelasId: kelasId
        }, {
            where: {
                id: siswa.id
            }
        })
        res.status(201).json({msg: `Data siswa berhasil diupdate!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteSiswa = async (req: Request, res: Response): Promise<void> => {
    const siswa = await Siswa.findOne({
        where: {
            nisn: req.params.id
        }
    })

    if (!siswa) {
        res.status(404).json({msg: `Data siswa tidak ditemukan!`})
        return;
    }

    try {
        await Siswa.destroy({
            where: {
                id: siswa.id
            }
        })
        res.status(200).json({msg: `Data siswa berhasil dihapus!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}