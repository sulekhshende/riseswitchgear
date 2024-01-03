import { ValidationError } from "express-validator";
import { CustomError } from "./customerror";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid Request Parameters');

        //extending built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError () {
        return this.errors.map((err) => {
            if (err.type === 'field') {
              return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
        // return this.errors.map((err) => {
        //     return { message: err.msg, field: err.type }
        // });
    };
}