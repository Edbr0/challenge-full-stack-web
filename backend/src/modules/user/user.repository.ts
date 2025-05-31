import { prisma } from '../../database/prisma';
import { ICreateUser } from './user.dto';
import { User } from './user.entity';



export class UserRepository {
    async create(data: ICreateUser): Promise<User> {
        const user = await prisma.user.create({
            data,
        });
        return user;
    }
}