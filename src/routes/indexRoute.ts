import { Router } from 'express';

import postRoutes from './APIs/postsAPIs';

const routes = Router();

routes.use('/posts', postRoutes);

export default routes;
