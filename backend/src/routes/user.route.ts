import { Router } from 'express';
import { UserController } from '../modules/user/user.controller';
import { UserService } from '../modules/user/user.service';
import { UserRepository } from '../modules/user/user.repository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const router = Router();

// Route to create a new student

/**
 * @openapi
 * /api/v1/user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               userName:
 *                 type: string
 *                 example: joaodasilva
 *               password:
 *                 type: string
 *                 example: senha123
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               roleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/', userController.createUser.bind(userController));

export default router;