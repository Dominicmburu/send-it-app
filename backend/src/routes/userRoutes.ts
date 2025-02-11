import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
import { updateUserSchema } from '../validations/user';

const router = Router();

router.get('/profile', authenticateJWT, userController.getProfile);

router.put('/profile', authenticateJWT, validateRequest(updateUserSchema), userController.updateProfile);

export default router;
