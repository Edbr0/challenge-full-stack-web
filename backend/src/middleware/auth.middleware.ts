import { NextFunction, Response } from 'express';
import { Request } from 'express';
import { verifyToken } from '../utils/jwt';
import { HttpStatus } from '../common/http.status';

declare global {
    namespace Express {
            interface Request {
          user?: string;
      }
    }
}

const authMiddleware: any = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No token provided, authorization denied.' });
  }

  const decoded = verifyToken(token)

  req.user = decoded;
  
  next();
};

export default authMiddleware;