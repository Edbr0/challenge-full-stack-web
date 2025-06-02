import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';
import { UserRepository } from '../modules/user/user.repository';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const router = Router();

// Route to create a new student


/**
 * @openapi
 * /api/v1/auth:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: joaodasilva
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso!
 *                 data:
 *                   type: string
 *                   description: Token JWT gerado
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: Credenciais inválidas
 */

router.post('/', authController.login.bind(authController));

export default router;