import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// Forgot password
passwordRouter.post('/forgot', forgotPasswordController.create);
// resat password
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
