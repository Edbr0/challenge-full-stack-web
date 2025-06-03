import { Router } from 'express';
import { StudentController } from '../modules/student/student.controller';
import { StudentService } from '../modules/student/student.service';
import { StudentRepository } from '../modules/student/student.repository';

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);
const router = Router();

// Rota para criar um novo estudante

/**
 * @openapi
 * /api/v1/student:
 *   post:
 *     summary: Cria um novo estudante
 *     tags:
 *       - Estudante
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
 *               email:
 *                 type: string
 *                 example: joaodasilva@gmail.com
 *               ra:
 *                 type: string
 *                 example: "123456789"
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 */
router.post('/', studentController.createStudent.bind(studentController));

// Rota para obter todos os estudantes
/**
 * @openapi
 * /api/v1/student:
 *   get:
 *     summary: Obtém todos os estudantes
 *     tags:
 *       - Estudante
 *     responses:
 *       200:
 *         description: Lista de estudantes
 */
router.get('/', studentController.getAllStudents.bind(studentController));


// Rota para atualizar um estudante existente
/**
 * @openapi
 * /api/v1/student/{id}:
 *   put:
 *     summary: Atualiza um estudante existente
 *     tags:
 *       - Estudante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudante
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
 *               email:
 *                 type: string
 *                 example: joaodasilva@gmail.com
 *               ra:
 *                 type: string
 *                 example: "123456788"
 *               cpf:
 *                 type: string
 *                 example: "12345678901"
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 */

// @ts-ignore
router.put('/:id', studentController.updateStudent.bind(studentController));




//Rota para excluir um estudante existente
/**
 * @openapi
 * /api/v1/student/{id}:
 *   delete:
 *     summary: Deleta um estudante da base de dados
 *     tags:
 *       - Estudante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do estudante
 *     responses:
 *       200:
 *         description: Registro excluido com sucesso
 */
router.delete('/:id', studentController.deleteStudent.bind(studentController));





export default router;