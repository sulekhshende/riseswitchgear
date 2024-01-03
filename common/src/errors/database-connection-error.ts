import { CustomError } from "./customerror";

export class DatabaseConnectionError extends CustomError {
    
    reason = "Error connecting to Database";
    statusCode = 500;

    constructor() {
        super('Error connection to Database');

        //extending built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError() {
        return [
            {
                message: this.reason
            }
        ]
    }
}