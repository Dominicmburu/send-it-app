import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateRequest } from '../middlewares/validationMiddleware';
import { registerSchema, loginSchema } from '../validations/auth';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
<<<<<<< HEAD

router.post('/login', validateRequest(loginSchema), authController.login);
=======
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/logout', authController.logout);
>>>>>>> 5befa322306a6ce5631946bdb3a2ba248b8366e2

export default router;
