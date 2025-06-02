import { Request, Response } from 'express';
import { UserService } from './user.service';
import { ApiResponse } from '../../common/app.success';
import { HttpStatus } from '../../common/http.status';
import { z } from 'zod';

export class UserController {

    constructor(readonly userService: UserService) {}

    public async createUser(req: Request, res: Response) {
        
        const userData = z.object({
            name: z.string().min(1, 'Campo nome é obrigatório'),
            userName: z.string().min(1, 'Campo nome de usuário é obrigatório'),
            password: z.string().min(6, 'Campo senha deve ter no minúmo 6 caracters'),
            cpf: z.string().min(11, 'Campo CPF deve ter no mínimo 11 caracteres'),
            roleId: z.number().int().positive('Campo perfil é obrigatório')
        }).parse(req.body);

        const newUser = await this.userService.createUser(userData);
        res.status(201).json(new ApiResponse('Usuário criado com sucesso!',newUser, HttpStatus.CREATED));
    }
}