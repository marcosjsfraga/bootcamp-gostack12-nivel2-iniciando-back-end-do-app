import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Apply middleware ensureAuthenticated in all routes
appointmentsRouter.use(ensureAuthenticated);

// Create an appointment
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
