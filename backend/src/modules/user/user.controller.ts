import { Request, Response } from 'express';
import { UserService } from './user.service';
import { ApiResponse } from '../../common/app.success';
import { HttpStatus } from '../../common/http.status';
import { z } from 'zod';
import { userSchema } from '../../validation/user.validation';

export class UserController {

    constructor(readonly userService: UserService) {}

    public async createUser(req: Request, res: Response) {
        const data = userSchema.parse(req.body);

        const newUser = await this.userService.createUser(data);
        
        res.status(201).json(new ApiResponse('Usuário criado com sucesso!',newUser, HttpStatus.CREATED));
    }
}