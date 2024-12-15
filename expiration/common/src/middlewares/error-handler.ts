import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customerror';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeError() })
    }

    console.log(err);
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
};