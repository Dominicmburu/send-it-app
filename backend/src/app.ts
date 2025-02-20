import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import parcelRoutes from './routes/parcelRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
 