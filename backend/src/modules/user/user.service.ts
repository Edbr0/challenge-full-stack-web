
import { ICreateUser } from './user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { hash } from 'bcrypt'
import { ApiError } from '../../common/app.error';
import { HttpStatus } from '../../common/http.status';


export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async createUser(data: ICreateUser): Promise<User> {

        const userCpfExists = await this.userRepository.findByUserCpf(data.cpf);
        
        if (userCpfExists) {
            throw new ApiError('Já existe um usuário cadastrado com este CPF', HttpStatus.BAD_REQUEST);
        }

        const userNameExists = await this.userRepository.findByUserName(data.userName);

        if (userNameExists) {
            throw new ApiError('Este nome de usuário não está disponível', HttpStatus.BAD_REQUEST);
        }

        const passwordWithHash = await hash(data.password, 10);

        const user = await this.userRepository.create({ ...data, password: passwordWithHash });

        return user;
    }
}