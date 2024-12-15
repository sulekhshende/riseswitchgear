import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@rsswitchgear/common';
import { CreatePaymentRouter } from './routes/create-payment';

<<<<<<< HEAD
=======

>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));


app.use(currentUser);
<<<<<<< HEAD
app.use(CreatePaymentRouter);
=======
app.use(CreatePaymentRouter)
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };