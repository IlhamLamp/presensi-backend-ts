import { Request, Response } from "express";
import User from "../db/models/User";

import Helper from "../helpers/Helper";
import PasswordHelper from "../helpers/PasswordHelper";

const Register = async (req: Request, res: Response): Promise<Response> => {
	// define
	const { 
		name,
		email,
		password,
		role
	} = req.body;

	try {
		const hashed = await PasswordHelper.PasswordHashing(password);
		const user = await User.create({
			name,
			email,
			password: hashed,
			role
		});
		return res.status(201).send(Helper.ResponseData(201, "Created", null, user));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
};

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: {
				email: email
			}
		});

		if (!user) {
			return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
		}

		const matched = await PasswordHelper.PasswordCompare(password, user.password);
		if (!matched) {
			return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
		}

		const dataUser = {
			name: user.name,
			email: user.email,
			role: user.role
		};
		const token = Helper.GenerateToken(dataUser);
		const refreshToken = Helper.GenerateRefreshToken(dataUser);

		user.accessToken = refreshToken;
		await user.save();
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});

		const responseUser = {
			name: user.name,
			email: user.email,
			role: user.role,
			token: token
		}
		return res.status(200).send(Helper.ResponseData(200, "OK", null, responseUser));
	} catch (error) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

export default { Register, UserLogin };