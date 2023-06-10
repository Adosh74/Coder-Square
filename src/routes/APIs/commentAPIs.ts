import Router from 'express';

import {
	createCommentHandler,
	deleteCommentHandler,
	listCommentsHandler,
} from '../../handlers/commentHandler';
import { isAuthenticated } from '../../middleware/auth.middleware';

const routes = Router();

routes
	.route('/:id')
	.post(isAuthenticated, createCommentHandler)
	.get(listCommentsHandler)
	.delete(isAuthenticated, deleteCommentHandler);

export default routes;
