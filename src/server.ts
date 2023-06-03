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

	app.use(requestLoggerMiddleware);

	app.use('/v1', asyncHandler(APIs));

	app.use(errHandler);

	app.listen(3001);
})();
