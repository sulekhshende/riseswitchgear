import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, ValidateRequest } from '@rsswitchgear/common';
import jwt from 'jsonwebtoken';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
        .isEmail()
        .withMessage('Email must be valid!'),
        body('password')
        .trim()
        .notEmpty()
        .withMessage('You must type your Password!')
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(!existingUser){
            throw new BadRequestError('Invalid Credentials!')
        }

        const passwordMatch = await Password.compare(
            existingUser.password,
            password
        );

        if(!passwordMatch){
            throw new BadRequestError('Invalid Password!')
        }
        
        //Generate Jwt token
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        //store on cokkie-session object
        req.session = {
            jwt: userJwt
        }    

        res.status(200).send(existingUser);
});

export { router as signinRouter }