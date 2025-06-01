import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../common/http.status';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if(err.message.includes('path') && err.message.includes('message')) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Validation Error',
            errors: err.errors || [],
        });

    }
    
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

export default errorMiddleware;