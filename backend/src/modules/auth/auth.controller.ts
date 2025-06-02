import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { HttpStatus } from '../../common/http.status';
import { ApiResponse } from '../../common/app.success';
import z from 'zod';

export class AuthController {

    constructor(readonly authService: AuthService) {}

    public async login(req: Request, res: Response) {
        
        const authData = z.object({
                userName: z.string().min(1, 'Campo nome de usuário é obrigatório'),
                password: z.string().min(6, 'Campo senha deve ter no minúmo 6 caracters'),
            }).parse(req.body);

        const token = await this.authService.login(authData);
        res.status(200).json(new ApiResponse('Login realizado com sucesso!', token, HttpStatus.OK));
    }
}

