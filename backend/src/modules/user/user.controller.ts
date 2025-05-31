import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {

    constructor(readonly userService: UserService) {}

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    }
}