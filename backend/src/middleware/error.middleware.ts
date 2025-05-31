import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../common/http.status';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

export default errorMiddleware;