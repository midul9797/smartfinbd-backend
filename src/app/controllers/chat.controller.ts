/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';

import { ChatServices } from '../services/chat.service';
import { JwtPayload } from 'jsonwebtoken';
import { IChatResponse } from '../interfaces/chat.interface';

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await ChatServices.sendMessage(req.body, userId);

  sendResponse<IChatResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Message sent succesfully',
    data: result,
  });
});

export const ChatController = {
  sendMessage,
};
