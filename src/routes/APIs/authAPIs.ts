import Router from 'express';

import {
	signInHandler,
	signupHandler,
} from '../../handlers/authHandler';

const routes = Router();

routes.post('/signup', signupHandler);
routes.post('/signin', signInHandler);

export default routes;
