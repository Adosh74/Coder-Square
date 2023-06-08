import express from 'express';
import asyncHandler from 'express-async-handler';

import { initDb } from './datastore/indexDao';
import { errHandler } from './middleware/errHandler.middleware';
import { requestLoggerMiddleware } from './middleware/logger.middleware';
import APIs from './routes/indexRoute';

(async () => {
	await initDb();
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(requestLoggerMiddleware);

	app.use('/v1', asyncHandler(APIs));

	app.use(errHandler);

	app.listen(process.env.PORT || 3001);
})();
