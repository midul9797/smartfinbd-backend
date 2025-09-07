import express from 'express'; // Import express for routing
import validateRequest from '../middlewares/validateRequest'; // Middleware for request validation
// Controller for blog operations
import auth from '../middlewares/auth'; // Middleware for authentication
import { InvestmentController } from '../controllers/investment.controller';
import { InvestmentValidation } from '../validations/investment.validation';

// Create an instance of the express Router
const router = express.Router();

// Define routes for blog operations
router

  .get('/', auth(), InvestmentController.getSingleInvestment)
  .post(
    '/',
    auth(),
    validateRequest(InvestmentValidation.createInvestmentZodSchema),
    InvestmentController.createInvestment,
  )
  .patch(
    '/:investmentId',
    auth(),
    validateRequest(InvestmentValidation.updateInvestmentZodSchema),
    InvestmentController.updateInvestment,
  );

// Export the router for use in the application
export const InvestmentRoutes = router;
