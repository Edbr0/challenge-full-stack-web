import jwt from 'jsonwebtoken';
import { ApiError } from '../common/app.error';
import { HttpStatus } from '../common/http.status';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = '24h';

export const generateToken = (userId: string): string => {
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
};

export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new ApiError('Token is not valid, authorization denied.', HttpStatus.FORBIDDEN);
    }
};