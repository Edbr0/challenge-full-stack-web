import { prisma } from '../../database/prisma';
import { ICreateUser } from './user.dto';
import { User } from './user.entity';



export class UserRepository {
    async create(data: ICreateUser): Promise<User> {
        const user = await prisma.user.create({
            data,
             select: {
                id: true,
                name: true,
                userName: true,
                cpf: true,
                roleId: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return user;
    }

    async findByUserName(userName: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                userName,
            },
            select: {
                id: true,
                name: true,
                userName: true,
                cpf: true,
                roleId: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                password: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return user;
    }

    async findByUserCpf(cpf: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                cpf,
            },
        });

        return user;
    }
}