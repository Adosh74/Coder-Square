import { RequestHandler } from 'express';

export const requestLoggerMiddleware: RequestHandler = (
	req,
	_res,
	next
) => {
	console.log(`${req.method} ${req.path}- body:${req.body}`);
	next();
};
