import { Router } from 'express';
import * as parcelController from '../controllers/parcelController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:parcelId', authenticateJWT, parcelController.getParcelDetails);

router.get('/', authenticateJWT, parcelController.getUserParcels);

<<<<<<< HEAD
=======
router.post(
    '/',
    authenticateJWT,
    parcelController.createParcel
  );

  router.put('/:parcelId/details', authenticateJWT, parcelController.updateParcelDetails);

>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2
export default router;
