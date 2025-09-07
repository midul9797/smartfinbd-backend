import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync'; // Import catchAsync to handle async errors
import sendResponse from '../../shared/sendResponse'; // Import sendResponse to send a formatted response
import httpStatus from 'http-status'; // Import httpStatus for HTTP status codes

import { PreferencesServices } from '../services/preferences.service'; // Import courseServices for database operations

import { JwtPayload } from 'jsonwebtoken';
import { IPreferences } from '../interfaces/preferences.interfaces';

// Function to create a new course
const createPreferences = catchAsync(async (req: Request, res: Response) => {
  const preferences = req.body; // Extract course details from request body
  const { userId } = req.user as JwtPayload;
  const result = await PreferencesServices.createPreferencesInDB({
    ...preferences,
    userId: userId,
  });

  sendResponse<IPreferences>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

// Function to retrieve all courses for a user
const getPreferences = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await PreferencesServices.getPreferencesFromDB(userId);
  // Send a success response with the retrieved courses
  sendResponse<IPreferences>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Preferences retrived successfully!!!',
    data: result || null,
  });
});
const updatePreferences = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await PreferencesServices.updatePreferencesInDB(
    userId,
    req.body,
  );
  sendResponse<IPreferences>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Preferences updated successfully!!!',
    data: result,
  });
});
// Export the course controller functions
export const PreferencesController = {
  createPreferences,
  getPreferences,
  updatePreferences,
};
