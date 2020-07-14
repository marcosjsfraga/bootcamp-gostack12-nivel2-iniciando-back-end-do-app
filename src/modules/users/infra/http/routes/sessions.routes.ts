import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

// User authenticate
sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });
    // Don't send password with response
    delete user.password;

    response.json({ user, token });
});

export default sessionsRouter;
