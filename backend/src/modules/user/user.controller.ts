import { Request, Response } from 'express';
import { UserService } from './user.service';
import { ApiResponse } from '../../common/app.success';
import { HttpStatus } from '../../common/http.status';

export class UserController {

    constructor(readonly userService: UserService) {}

    public async createUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        const newUser = await this.userService.createUser(userData);
        res.status(201).json(new ApiResponse('Usuário criado com sucesso!',newUser, HttpStatus.CREATED));
    }
}