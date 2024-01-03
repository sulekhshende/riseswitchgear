import { CustomError } from "./customerror";


export class NotAuthorizeError extends CustomError {
    statusCode: number = 401;
    constructor(){
        super('Not Authorize')

        Object.setPrototypeOf(this, NotAuthorizeError.prototype);
    }

    serializeError() {
        return [{ message: 'Not Authorize' }]
    }
} 