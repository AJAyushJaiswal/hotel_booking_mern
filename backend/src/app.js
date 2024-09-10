import express from 'express';
import cors from 'cors';
import {errorHandler} from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));



app.use(errorHandler);

export default app;