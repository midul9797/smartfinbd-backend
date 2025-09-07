import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { AuthValidation } from '../validations/auth.validation';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);

export const AuthRoute = router;
