import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpStatus } from '../common/http.status';

const errorMiddleware: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if(err.message.includes('path') && err.message.includes('message')) {
        res.status(HttpStatus.BAD_REQUEST).json({
            status: 'error',
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Validation Error',
            errors: err.errors || [],
        });
        return;
    }
    
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
    return;
};

export default errorMiddleware;