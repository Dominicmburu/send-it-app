import { Router } from 'express';
import * as parcelController from '../controllers/parcelController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:parcelId', authenticateJWT, parcelController.getParcelDetails);

router.get('/', authenticateJWT, parcelController.getUserParcels);

router.post(
    '/',
    authenticateJWT,
    parcelController.createParcel
  );

  router.put('/:parcelId/details', authenticateJWT, parcelController.updateParcelDetails);

export default router;
