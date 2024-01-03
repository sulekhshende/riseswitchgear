import { CustomError } from "./customerror";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor () {
        super('Not found')

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError() {
        return [
            {message: 'Not Found!'}
        ]
    }
}