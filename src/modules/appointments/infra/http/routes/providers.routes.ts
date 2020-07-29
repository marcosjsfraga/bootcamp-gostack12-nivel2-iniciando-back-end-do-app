import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

// Apply middleware ensureAuthenticated in all routes
providersRouter.use(ensureAuthenticated);

// Create an appointment
providersRouter.get('/', providersController.index);

export default providersRouter;
