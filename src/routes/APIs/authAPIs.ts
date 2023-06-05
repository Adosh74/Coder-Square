import Router from 'express';

import {
	signInHandler,
	signupHandler,
} from '../../handlers/userHandler';

const routes = Router();

routes.post('/signup', signupHandler);
routes.post('/signin', signInHandler);

export default routes;
