import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// User authenticate
sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        // Don't send password with response
        delete user.password;

        response.json({ user, token });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

export default sessionsRouter;
