import bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { ApiError } from '../../common/app.error';
import { ILogin } from './auth.dto';
import { generateToken } from '../../utils/jwt';


export class AuthService {

    constructor(readonly userRepository: UserRepository) {}

    async login(data: ILogin) {
        const { userName, password } = data;
        const user = await this.userRepository.findByUserName(userName);

        if (!user) {
            throw new ApiError('Usuário ou senha inválidos', 401);
        }

        const comparePassword = (await bcrypt.compare(password, user.password as string))

        if (!comparePassword) {
            throw new ApiError('Usuário ou senha inválidos', 401);
        }

        const { password: _, ...userWithoutPassword } = user;

        const token = generateToken(String(user.id));
        return { user: userWithoutPassword, token };
    }
}