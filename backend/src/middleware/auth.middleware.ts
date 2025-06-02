import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { verifyToken } from '../utils/jwt';
import { HttpStatus } from '../common/http.status';

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware: any = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provided, authorization denied.' });
    }

    const decoded = verifyToken(token)

    req.user = decoded;
    next();
};

export default authMiddleware;