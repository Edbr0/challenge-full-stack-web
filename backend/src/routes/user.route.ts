import { Router } from 'express';
import { UserController } from '../modules/user/user.controller';
import { UserService } from '../modules/user/user.service';
import { UserRepository } from '../modules/user/user.repository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const router = Router();

// Route to create a new student
router.post('/', userController.createUser.bind(userController));

export default router;