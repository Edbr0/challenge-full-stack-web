import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { prisma } from '../../database/prisma';
import { ICreateUser } from './user.dto';
import { User } from './user.entity';


jest.mock('../../database/prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
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
            password: '123',
            createdAt: new Date(),
            updatedAt: new Date(),
            cpf: '12345678901',
            isActive: false,
            roleId: 0
        };

        // @ts-ignore
        prisma.user.create.mockResolvedValue(expectedUser);

        const result = await userService.createUser(inputData);

        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                ...inputData,
            },
        });

        expect(prisma.user.create).toHaveBeenCalledWith({ data: inputData });
        expect(result).toEqual(expectedUser);
    });
});