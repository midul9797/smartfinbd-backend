import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync'; // Import catchAsync to handle async errors
import sendResponse from '../../shared/sendResponse'; // Import sendResponse to send a formatted response
import httpStatus from 'http-status'; // Import httpStatus for HTTP status codes
import { IRiskAssessment } from '../interfaces/risk.assessment.interface'; // Import IStudent interface
import { RiskAssessmentServices } from '../services/risk.assessment.service'; // Import studentServices for database operations

import { JwtPayload } from 'jsonwebtoken';

// Function to create a new student
const createRiskAssessment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const payload = req.body;
  const result = await RiskAssessmentServices.createRiskAssessmentInDB(
    userId,
    payload,
  );

  sendResponse<IRiskAssessment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Risk assessment created successfully',
    data: result,
  });
});

const getSingleRiskAssessment = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as JwtPayload;
    const result = await RiskAssessmentServices.getRiskAssessmentFromDB(userId);
    sendResponse<IRiskAssessment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Risk assessment retrived successfully!!!',
      data: result || null,
    });
  },
);

const updateRiskAssessment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { riskAssessmentId } = req.params;
  const result = await RiskAssessmentServices.updateRiskAssessmentInDB(
    userId,
    riskAssessmentId,
    req.body,
  );
  sendResponse<IRiskAssessment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Risk assessment updated successfully!!!',
    data: result || null,
  });
});

// Export the student controller functions
export const RiskAssessmentController = {
  createRiskAssessment,
  getSingleRiskAssessment,
  updateRiskAssessment,
};
