import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';


interface TokenPayload {
  user_id: number;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
  username: string;
  email: string;
  phone_number: string;
  address: string;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction):void => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token.' });
        return;
      }
      req.user = decoded as TokenPayload;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
    return;
  }
};
