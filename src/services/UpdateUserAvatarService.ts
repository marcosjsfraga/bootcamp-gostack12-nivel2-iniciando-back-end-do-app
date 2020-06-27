import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: RequestDTO): Promise<void> {
        const usersRepository = getRepository(User);

        const user = usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar.');
        }

        if (user.avatar) {
            // Delete last avatar
        }
    }
}
