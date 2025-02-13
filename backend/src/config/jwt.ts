import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined.');
}

export const JWT_SECRET: string = process.env.JWT_SECRET;
<<<<<<< HEAD
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h';
=======
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN as string;
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
