import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';

type Indexed = {
	[key: string]: any;
};
export const isAuthenticated: RequestHandler = (
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
		if (bearer !== 'Bearer') {
			return res.status(400).send('Invalid token');
		}
		if (!token) return res.status(401).send('access denied');

		const decodedPayload = jwt.verify(
			token,
			config.tokenSecret as unknown as string
		);
		if (!decodedPayload) return res.status(401).send('Invalid token');
		req.user = decodedPayload;
		next();
	} catch (error) {
		return res.status(401).send('access denied');
	}
};
