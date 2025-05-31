
import { ICreateUser } from './user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { hash } from 'bcrypt'


export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async createUser(data: ICreateUser): Promise<User> {
        try {

            const passwordWithHash = await hash(data.password, 10);
            const student = await this.userRepository.create({ ...data, password: passwordWithHash });
            return student;
        } catch (error) {
            console.error('Error creating user:', error);
            if (error instanceof Error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
            throw new Error('Error creating user: Unknown error');
        }
    }
}