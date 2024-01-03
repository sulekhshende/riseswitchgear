import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, ValidateRequest } from '@rsswitchgear/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', 
    [
        body('email')
        .isEmail()
        .withMessage('Email must be valid!'),
        body('password')
        .trim()
        .isLength({ min: 4, max:10 })
        .withMessage('Password must be valid')
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new BadRequestError('Email Already Exists!')
        }

        const user = User.build({email,password});
        await user.save();

        //Generate Jwt token
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        //store on cokkie-session object
        req.session = {
            jwt: userJwt
        }    

        res.status(201).send(user);
});

export { router as signupRouter }