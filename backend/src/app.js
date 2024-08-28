import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));

app.get('/api/test', async (req, res) => {
    res.json({message: "hello from express endpoint"});
});


export default app;