import Router from 'express';

import {
	createCommentHandler,
	listCommentsHandler,
} from '../../handlers/commentHandler';
import { isAuthenticated } from '../../middleware/auth.middleware';

const routes = Router();

routes
	.route('/:id')
	.post(isAuthenticated, createCommentHandler)
	.get(listCommentsHandler);

export default routes;
