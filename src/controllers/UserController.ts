import { Request, Response } from "express";
import User from "../db/models/User";
import argon2 from 'argon2';

interface UserAttributes {
    id: number,
    uuid: string,
    name: string,
    email: string,
    password: string,
    confPassword: string,
    role: string 
}

export const getUsers = async(req: Request, res: Response):Promise<void> => {

    try {
        const response = await User.findAll();
        if (response.length !== 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({msg: 'Data masih kosong'});
        }

    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const getUserById = async(req: Request, res:Response):Promise<void> => {

    try {

        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });

        if (response !== null) {
            res.status(200).json(response);
        } else {
            res.status(404).json({msg: `Data user tidak ditemukan`})
        }
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const createUser = async (req:Request, res: Response): Promise<void> => {
    // define
    const {
        name,
        email,
        password,
        confPassword,
        role
    }: UserAttributes = req.body;

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
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: `Register Berhasil!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}


export const updateUser = async (req: Request, res: Response): Promise<void> =>{
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!user) {
        res.status(404).json({msg: `Data user tidak ditemukan`})
        return;
    }
        

    // define
    const {
        name,
        email,
        password,
        confPassword,
        role
    }: UserAttributes = req.body;

    let hashPassword : string;

    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password)
    }

    if (password !== confPassword) {
        res.status(400).json({msg: `Password dan konfirmasi password harus sesuai!`})
        return;
    }
    
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        })
        res.status(201).json({msg: `Data user berhasil di update!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    })

    if (!user) {
        res.status(404).json({msg: `Data user tidak ditemukan!`})
        return;
    }

    try {
        await User.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200).json({msg: `Data user berhasil dihapus!`})
    } catch (error: any) {
        res.status(400).json({msg: error.message})
    }
}