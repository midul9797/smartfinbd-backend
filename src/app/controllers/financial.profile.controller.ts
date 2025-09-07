import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync'; // Import catchAsync to handle async errors
import sendResponse from '../../shared/sendResponse'; // Import sendResponse to send a formatted response
import httpStatus from 'http-status'; // Import httpStatus for HTTP status codes
import { IFinancialProfile } from '../interfaces/financial.profile.interface'; // Import IStudent interface
import { FinancialProfileServices } from '../services/financial.profile.service'; // Import studentServices for database operations

import { JwtPayload } from 'jsonwebtoken';

// Function to create a new student
const createFinancialProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as JwtPayload;
    const payload = req.body;
    const result = await FinancialProfileServices.createFinancialProfileInDB(
      userId,
      payload,
    );

    sendResponse<IFinancialProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Financial profile created successfully',
      data: result,
    });
  },
);

const getSingleFinancialProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as JwtPayload;

    const result =
      await FinancialProfileServices.getFinancialProfileFromDB(userId);
    sendResponse<IFinancialProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Financial profile retrived successfully!!!',
      data: result || null,
    });
  },
);

const updateFinancialProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as JwtPayload;
    const result = await FinancialProfileServices.updateFinancialProfileInDB(
      userId,
      req.body,
    );
    sendResponse<IFinancialProfile>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Financial profile updated successfully!!!',
      data: result || null,
    });
  },
);

// Export the student controller functions
export const financialProfileController = {
  createFinancialProfile,
  getSingleFinancialProfile,
  updateFinancialProfile,
};
