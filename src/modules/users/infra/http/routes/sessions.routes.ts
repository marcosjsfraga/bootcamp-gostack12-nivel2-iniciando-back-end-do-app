import { Router } from 'express';

import SessionController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionController();

// User authenticate
sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
