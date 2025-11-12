import type { Request, Response } from 'express';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import gameRouter from './routes/gameRoute.js';
import notFoundHandler from './errors/notFoundHandler.js';
import errorHandler from './errors/errorHandler.js';
import authRouter from './routes/authRoute.js';
import { attachUser } from './middleware/attachUser.js';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());

app.get('/favicon.ico', (req: Request, res: Response) => {
    res.status(204).send();
});

app.use('/api', authRouter);
app.use(attachUser);
app.use('/api', userRouter);
app.use('/api', gameRouter);

// Health check
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running ✅' });
});

// --- Error handler ---
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
