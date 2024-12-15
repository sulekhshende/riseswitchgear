import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


interface UserPayload {
    id: string;
    username?: string;
    email: string;
    isAdmin?: boolean;
    address?: string;
}

declare module 'express' {
    interface Request {
        currentUser?: UserPayload;
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if(!req.session?.jwt){
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload;
    } catch (err) {
        
    }

    next();
}