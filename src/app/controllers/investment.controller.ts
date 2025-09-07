import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync'; // Import catchAsync to handle async errors
import sendResponse from '../../shared/sendResponse'; // Import sendResponse to send a formatted response
import httpStatus from 'http-status'; // Import httpStatus for HTTP status codes
import { IInvestment } from '../interfaces/investment.interface'; // Import IStudent interface
import { InvestmentServices } from '../services/investment.service'; // Import studentServices for database operations

import { JwtPayload } from 'jsonwebtoken';

// Function to create a new student
const createInvestment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const payload = req.body;
  const result = await InvestmentServices.createInvestmentInDB(userId, payload);

  sendResponse<IInvestment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment created successfully',
    data: result,
  });
});

const getSingleInvestment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await InvestmentServices.getInvestmentFromDB(userId);
  sendResponse<IInvestment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment retrived successfully!!!',
    data: result || null,
  });
});

const updateInvestment = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const { investmentId } = req.params;
  const result = await InvestmentServices.updateInvestmentInDB(
    userId,
    investmentId,
    req.body,
  );
  sendResponse<IInvestment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment updated successfully!!!',
    data: result || null,
  });
});

// Export the student controller functions
export const InvestmentController = {
  createInvestment,
  getSingleInvestment,
  updateInvestment,
};
