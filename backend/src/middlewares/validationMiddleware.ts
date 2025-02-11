import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction):void => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      res.status(400).json({ message });
      return;
    }
    next();
  };
};
