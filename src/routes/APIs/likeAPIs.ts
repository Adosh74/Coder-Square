import Router from 'express';

import {
	createLikeHandler,
	listLikesHandler,
} from '../../handlers/likeHandler';
import { isAuthenticated } from '../../middleware/auth.middleware';

const routes = Router();

routes
	.route('/:id')
	.post(isAuthenticated, createLikeHandler)
	.get(listLikesHandler);

export default routes;
