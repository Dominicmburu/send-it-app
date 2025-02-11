import { Request, Response, NextFunction } from 'express';

export const adminCheck = (req: Request, res: Response, next: NextFunction):void => {
  if (req.user && req.user.role === 'admin') {
    next();
    return;
  }
  res.status(403).json({ message: 'Access denied. Admins only.' });
  return;
};
