import { Router, application } from 'express';

import authRoutes from './APIs/authAPIs';
import commentRoutes from './APIs/commentAPIs';
import likeRoutes from './APIs/likeAPIs';
import postRoutes from './APIs/postsAPIs';

const routes = Router();

routes.use(authRoutes);
routes.use('/posts', postRoutes);
routes.use('/comments', commentRoutes);
routes.use('/likes', likeRoutes);

export default routes;
