import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
// Instantiate Multer
const upload = multer(uploadConfig);

// Create an user.
// (*) Apps don't have authenticate to create a User
usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        // Hide password in the user object that returns
        delete user.password;

        response.json(user);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

// Patch is used when we want to update only one information
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatarService = new UpdateUserAvatarService();

            await updateUserAvatarService.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            response.json({ OK: true });
        } catch (error) {
            response.status(400).json({ error: error.message });
        }

        return response.json({ OK: true });
    },
);

export default usersRouter;
