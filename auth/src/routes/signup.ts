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
<<<<<<< HEAD
        .withMessage('Password must be valid'),
        body('username')
        .trim()
        .isLength({ min: 4, max:10 })
        .withMessage('Username must be valid!')
=======
        .withMessage('Password must be valid')
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {

<<<<<<< HEAD
        const { email, password, username, isAdmin, city, contactNumber, country, address } = req.body;
=======
        const { email, password } = req.body;
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new BadRequestError('Email Already Exists!')
        }

<<<<<<< HEAD
        const user = User.build({email,password, username, isAdmin, city, contactNumber, country, address});
=======
        const user = User.build({email,password});
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
        await user.save();

        //Generate Jwt token
        const userJwt = jwt.sign({
            id: user.id,
<<<<<<< HEAD
            email: user.email,
            isAdmin: user.isAdmin
=======
            email: user.email
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
        }, process.env.JWT_KEY!);

        //store on cokkie-session object
        req.session = {
            jwt: userJwt
        }    

        res.status(201).send(user);
});

export { router as signupRouter }