import { Router } from 'express';

import {
	createPostHandler,
	listPostsHandler,
} from '../../handlers/postHandler';

const routes = Router();

routes.route('/').get(listPostsHandler).post(createPostHandler);

export default routes;
