import { Router } from 'express';

import authRoutes from './APIs/authAPIs';
import postRoutes from './APIs/postsAPIs';

const routes = Router();

routes.use('/posts', postRoutes);
routes.use(authRoutes);

export default routes;
