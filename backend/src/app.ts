import express from 'express';
import dotenv from 'dotenv';
<<<<<<< HEAD
=======
import cookieParser from 'cookie-parser';
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import parcelRoutes from './routes/parcelRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());
<<<<<<< HEAD
=======
app.use(cookieParser());
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
