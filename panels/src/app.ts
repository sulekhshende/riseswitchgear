import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@rsswitchgear/common';
import { createPanelRouter } from './routes/create-panel';
import { showPanelRouter } from './routes/show-panel';
<<<<<<< HEAD
import { showAllPanelsRouter } from './routes';
=======
import { showAllPanelsRouter } from './routes/show-all-panels';
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
import { updatePanelRouter } from './routes/update-panel';


const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));


app.use(currentUser);

app.use(createPanelRouter);
app.use(showPanelRouter);
app.use(showAllPanelsRouter);
app.use(updatePanelRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };