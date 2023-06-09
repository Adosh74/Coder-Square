import { Router } from 'express';

import authRoutes from './APIs/authAPIs';
import commentRoutes from './APIs/commentAPIs';
import postRoutes from './APIs/postsAPIs';

const routes = Router();

routes.use(authRoutes);
routes.use('/posts', postRoutes);
routes.use('/comments', commentRoutes);

export default routes;
