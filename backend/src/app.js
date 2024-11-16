import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorHandler} from './middlewares/errorHandler.middleware.js';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(cookieParser());

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
}


// routes
import userRouter from './routes/user.routes.js';
import hotelRouter from './routes/hotel.routes.js';
import roomRouter from './routes/room.routes.js';
import searchRouter from './routes/search.routes.js';

app.use('/api/v1/users/', userRouter);
app.use('/api/v1/hotels/', hotelRouter);
app.use('/api/v1/rooms/', roomRouter);
app.use('/api/v1/search/', searchRouter);


if(process.env.NODE_ENV === 'production'){
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
    })
}


app.use(errorHandler);

export default app;