import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';

import { UserServices } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { JwtPayload } from 'jsonwebtoken';
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserInDB(req.body);

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User siggned up succesfully',
    data: result,
  });
});
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await UserServices.getProfileFromDB(userId);

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User siggned up succesfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await UserServices.changePasswordInDB(userId, req.body);

  sendResponse<boolean>(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed succesfully',
    data: result,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await UserServices.updateProfileInDB(userId, req.body);

  sendResponse<boolean>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated succesfully',
    data: result,
  });
});
export const UserController = {
  createUser,
  getProfile,
  changePassword,
  updateProfile,
};
