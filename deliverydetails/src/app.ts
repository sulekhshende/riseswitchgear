import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@rsswitchgear/common';
import { createdeliverydetailsRouter } from './routes/add-delivery-details';
import { showDeliveryDetailsRouter } from './routes/show-delivery-details';


const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));


app.use(currentUser);

app.use(createdeliverydetailsRouter);
app.use(showDeliveryDetailsRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };