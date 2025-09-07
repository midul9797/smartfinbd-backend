/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';

import { AuthServices } from '../services/auth.service';
import { ILoginUserResponse } from '../interfaces/auth.interface';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUser(loginData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in succesfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
