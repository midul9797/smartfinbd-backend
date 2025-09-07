import express from 'express'; // Import express for routing
import validateRequest from '../middlewares/validateRequest'; // Middleware for request validation
// Controller for blog operations
import auth from '../middlewares/auth'; // Middleware for authentication
import { financialProfileController } from '../controllers/financial.profile.controller';
import { FinancialProfileValidation } from '../validations/financial.profile.validation';

// Create an instance of the express Router
const router = express.Router();

// Define routes for blog operations
router

  .get('/', auth(), financialProfileController.getSingleFinancialProfile)
  .get('/predict', auth(), financialProfileController.predictFinancialProfile)
  .post(
    '/',
    auth(),
    validateRequest(FinancialProfileValidation.createFinancialProfileZodSchema),
    financialProfileController.createFinancialProfile,
  )
  .put(
    '/',
    auth(),
    validateRequest(FinancialProfileValidation.updateFinancialProfileZodSchema),
    financialProfileController.updateFinancialProfile,
  );

// Export the router for use in the application
export const FinancialProfileRoutes = router;
