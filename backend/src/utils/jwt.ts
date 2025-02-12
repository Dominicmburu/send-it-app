import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '5fa1ab797090d25d08a6d65d6d5276bfafafcb473e3930ab607af303ddbe267f';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

interface TokenPayload {
  user_id: number;
  role: 'user' | 'admin';
}


export const signToken = ({ user_id, role }: TokenPayload): string => {
  const payload = { user_id, role };
  const options: SignOptions = { expiresIn: '1d' };
  return jwt.sign(payload, JWT_SECRET as string, options);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
