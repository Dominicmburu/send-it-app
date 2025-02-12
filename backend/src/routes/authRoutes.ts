import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateRequest } from '../middlewares/validationMiddleware';
import { registerSchema, loginSchema } from '../validations/auth';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/logout', authController.logout);

export default router;
