import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { RequestHandler } from 'express';

import config from '../config';
import { db } from '../datastore/indexDao';
import { User } from '../types';
import hashPassword from '../utilities/hashPassword';

export const signupHandler: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { firstName, lastName, username, email, password } =
			req.body;

		if (!firstName || !lastName || !username || !email || !password) {
			return res.status(400).send('fill all required fields');
		}

		const existing =
			(await db.getUserByEmail(email)) ||
			(await db.getUserByUsername(username));

		if (existing) {
			return res.status(400).send('User already exists');
		}

		const user: User = {
			id: crypto.randomUUID(),
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password: hashPassword(password),
		};
		await db.createUser(user);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};

export const signInHandler: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { login, password } = req.body;
		const user =
			(await db.getUserByEmail(login)) ||
			(await db.getUserByUsername(login));

		const validPassword = await bcrypt.compare(
			`${password}${config.pepper}`,
			user?.password as unknown as string
		);

		if (!user || !validPassword) {
			return res.status(401).send('wrong information');
		}

		res.status(200).json({
			message: 'login successful',
			data: {
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		next(error);
	}
};
