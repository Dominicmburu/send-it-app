import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { adminCheck } from '../middlewares/adminMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
<<<<<<< HEAD
import { createParcelSchema, updateParcelStatusSchema } from '../validations/parcel';
=======
import { 
  createParcelSchema, 
  updateParcelStatusSchema, 
  updateParcelDetailsSchema 
} from '../validations/parcel';
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2

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

<<<<<<< HEAD
=======
router.put(
  '/parcel/details',
  authenticateJWT,
  adminCheck,
  validateRequest(updateParcelDetailsSchema),
  adminController.updateParcelDetails
);

router.delete(
  '/parcel/:id',
  authenticateJWT,
  adminCheck,
  adminController.deleteParcel
);

router.get(
  '/parcels',
  authenticateJWT,
  adminCheck,
  adminController.getAllParcels
);

>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
export default router;
