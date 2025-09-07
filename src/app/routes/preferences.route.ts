import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { PreferencesController } from '../controllers/preferences.controller';
import auth from '../middlewares/auth';
import { PreferencesValidation } from '../validations/preferences.validation';

const router = express.Router();
router

  .get('/', auth(), PreferencesController.getPreferences)
  .patch(
    '/',
    auth(),
    validateRequest(PreferencesValidation.updatePreferencesZodSchema),
    PreferencesController.updatePreferences,
  );
export const PreferencesRoutes = router;
