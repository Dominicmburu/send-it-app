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
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } 

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401).json({ message: 'No token provided.' });
    return;
  }

  jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error("Verification error:", err);
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }
    req.user = decoded as TokenPayload;
    next();
  });
};
