import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@rsswitchgear/common';
import { createOrderRouter } from './routes/create-order';
import { showOrderRouter } from './routes/show-order';
import { deleteOrderRouter } from './routes/delete-order';
<<<<<<< HEAD
import { showAllOrdersRouter } from './routes';
=======
import { showAllOrdersRouter } from './routes/show-all-orders';
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83


const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));


app.use(currentUser);

app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(showAllOrdersRouter);
app.use(deleteOrderRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };