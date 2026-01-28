// src/modules/auth/auth.routes.ts (Day 1 version)
import { Router } from 'express';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { validateRequest } from '../../core/middleware/validation.middleware.js';
import { loginSchema, registerSchema } from './auth.validation.js';
import { AuthController } from './index.js';

const router = Router();
const authController = new AuthController();

// Public routes
router.post(
  '/register',
  validateRequest(registerSchema),
  authController.register,
);

router.post('/login', validateRequest(loginSchema), authController.login);

// Protected routes (with placeholder middleware)
router.get(
  '/profile',
  authenticate, // Placeholder - will verify JWT in Day 2
  authController.getProfile,
);

router.post(
  '/logout',
  authenticate, // Placeholder
  authController.logout,
);

export const authRoutes = router;
