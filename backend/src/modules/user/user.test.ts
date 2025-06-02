import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { prisma } from '../../database/prisma';
import { ICreateUser } from './user.dto';
import { User } from './user.entity';


jest.mock('../../database/prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('123'),
}));

describe('UserService', () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a user and return the created user', async () => {
        const inputData: ICreateUser = {
            name: 'Test User',
            cpf: '12345678901',
            roleId: 1,
            userName: 'test.user',
            password: '123',
        };

        const expectedUser: User = {
            id: 1,
            name: 'Test User',
            userName: 'test.user',
            createdAt: new Date(),
            updatedAt: new Date(),
            cpf: '12345678901',
            isActive: true,
            roleId: 1,
            role: {
                name: 'User',
            },
        };

        // @ts-ignore
        prisma.user.create.mockResolvedValue(expectedUser);

        const result = await userService.createUser(inputData);

        expect(prisma.user.create).toHaveBeenCalledWith({
            data: inputData,
            select: {
                id: true,
                name: true,
                userName: true,
                createdAt: true,
                updatedAt: true,
                cpf: true,
                isActive: true,
                roleId: true,
                role: { select: { name: true } }
            }
        });

        expect(result).toEqual(expectedUser);
    });
});