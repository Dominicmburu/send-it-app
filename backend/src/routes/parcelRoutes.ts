import { Router } from 'express';
import * as parcelController from '../controllers/parcelController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:parcelId', authenticateJWT, parcelController.getParcelDetails);

router.get('/', authenticateJWT, parcelController.getUserParcels);

export default router;
