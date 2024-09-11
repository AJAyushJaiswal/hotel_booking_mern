import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorHandler} from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));


// routes
import userRouter from './routes/user.routes.js';

app.use('/api/v1/users/', userRouter);


//app.use(errorHandler);

export default app;