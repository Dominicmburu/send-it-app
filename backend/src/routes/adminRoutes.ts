import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { adminCheck } from '../middlewares/adminMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
import { createParcelSchema, updateParcelStatusSchema } from '../validations/parcel';

const router = Router();

router.post(
  '/parcel', 
  authenticateJWT, 
  adminCheck, 
  validateRequest(createParcelSchema),
  adminController.createParcel
);

router.put(
  '/parcel/status',
  authenticateJWT,
  adminCheck,
  validateRequest(updateParcelStatusSchema),
  adminController.updateParcelStatus
);

export default router;
