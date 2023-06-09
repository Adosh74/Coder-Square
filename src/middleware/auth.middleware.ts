import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import { db } from '../datastore/indexDao';
import { JwtObject } from '../types';
import { Indexed } from './custom';

export const isAuthenticated: RequestHandler = async (
	req: Indexed,
	res,
	next
) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return res.status(401).send('access denied');
		}
		const bearer = authorization && authorization.split(' ')[0];
		const token = authorization && authorization.split(' ')[1];

		if (bearer !== 'Bearer')
			return res.status(400).send('Invalid token');

		if (!token) return res.status(401).send('access denied');

		const decodedPayload: JwtObject = jwt.verify(
			token,
			config.tokenSecret as unknown as string
		) as JwtObject;
		if (!decodedPayload) return res.status(401).send('Invalid token');
		const user = await db.getUserByUsername(decodedPayload.username);

		if (!user)
			return res.status(401).json({
				message: 'user not found',
			});

		req.user = decodedPayload;
		next();
	} catch (error) {
		return res.status(401).send({ error: 'access denied' });
	}
};
