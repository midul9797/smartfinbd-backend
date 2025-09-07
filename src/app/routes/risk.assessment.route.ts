import express from 'express'; // Import express for routing
import validateRequest from '../middlewares/validateRequest'; // Middleware for request validation
// Controller for blog operations
import auth from '../middlewares/auth'; // Middleware for authentication
import { RiskAssessmentValidation } from '../validations/risk.assessment.validation';
import { RiskAssessmentController } from '../controllers/risk.assessment.controller';

// Create an instance of the express Router
const router = express.Router();

// Define routes for blog operations
router

  .get('/', auth(), RiskAssessmentController.getSingleRiskAssessment)
  .post(
    '/',
    auth(),
    validateRequest(RiskAssessmentValidation.createRiskAssessmentZodSchema),
    RiskAssessmentController.createRiskAssessment,
  )
  .patch(
    '/:riskAssessmentId',
    auth(),
    validateRequest(RiskAssessmentValidation.updateRiskAssessmentZodSchema),
    RiskAssessmentController.updateRiskAssessment,
  );

// Export the router for use in the application
export const RiskAssessmentRoutes = router;
