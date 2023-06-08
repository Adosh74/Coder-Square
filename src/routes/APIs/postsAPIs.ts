import { Router } from 'express';

import {
	createPostHandler,
	listPostsHandler,
} from '../../handlers/postHandler';
import { isAuthenticated } from '../../middleware/auth.midleware';

const routes = Router();

routes
	.route('/')
	.get(isAuthenticated, listPostsHandler)
	.post(createPostHandler);

export default routes;
