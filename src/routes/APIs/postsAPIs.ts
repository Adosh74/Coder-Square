import { Router } from 'express';

import {
	createPostHandler,
	deletePostHandler,
	listPostsHandler,
} from '../../handlers/postHandler';
import { isAuthenticated } from '../../middleware/auth.middleware';

const routes = Router();

routes
	.route('/')
	.get(isAuthenticated, listPostsHandler)
	.post(isAuthenticated, createPostHandler);

routes.route('/:id').delete(isAuthenticated, deletePostHandler);

export default routes;
