import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import auth from '../middlewares/auth';
import { UserController } from '../controllers/user.controller';
import { UserValidation } from '../validations/user.validation';

const router = express.Router();
router
  .post(
    '/',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser,
  )
  .patch(
    '/change-password',
    auth(),
    validateRequest(UserValidation.changePasswordZodSchema),
    UserController.changePassword,
  )
  .patch(
    '/update-profile',
    auth(),
    validateRequest(UserValidation.updateProfileZodSchema),
    UserController.updateProfile,
  )
  .get('/my-profile', auth(), UserController.getProfile);

export const UserRoute = router;
