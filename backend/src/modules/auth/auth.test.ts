import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../common/app.error';

jest.mock('../user/user.repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService - login', () => {
    let authService: AuthService;
    let userRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepository = new UserRepository() as jest.Mocked<UserRepository>;
        authService = new AuthService(userRepository);
        process.env.JWT_SECRET = 'test_secret';
    });

    it('deve autenticar e retornar token e usuário sem senha', async () => {
        const fakeUser = { id: 1, userName: 'test', password: 'hashed' };
        userRepository.findByUserName = jest.fn().mockResolvedValue(fakeUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('fake_token');

        const result = await authService.login({ userName: 'test', password: '123' });

        expect(result).toHaveProperty('token', 'fake_token');
        expect(result.user).not.toHaveProperty('password');
        expect(result.user).toMatchObject({ id: 1, userName: 'test' });
    });

    it('deve lançar erro se usuário não existir', async () => {
        userRepository.findByUserName = jest.fn().mockResolvedValue(null);

        await expect(authService.login({ userName: 'notfound', password: '123' }))
            .rejects.toThrow(ApiError);
    });

    it('deve lançar erro se senha estiver incorreta', async () => {
        const fakeUser = { id: 1, userName: 'test', password: 'hashed' };
        userRepository.findByUserName = jest.fn().mockResolvedValue(fakeUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(authService.login({ userName: 'test', password: 'wrong' }))
            .rejects.toThrow(ApiError);
    });
});