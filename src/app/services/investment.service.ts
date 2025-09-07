/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

import { IInvestment } from '../interfaces/investment.interface';
import Investment from '../models/investment.model';
import { Types } from 'mongoose';
const createInvestmentInDB = async (
  userId: string,
  payload: IInvestment,
): Promise<IInvestment> => {
  const createdInvestment = await Investment.create({
    ...payload,
    userId: userId,
  });
  if (!createdInvestment)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create investment');
  return createdInvestment;
};
const getInvestmentFromDB = async (userId: string): Promise<IInvestment[]> => {
  const investment = await Investment.find({ userId: userId });
  if (!investment)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved investment',
    );
  return investment;
};

const updateInvestmentInDB = async (
  userId: string,
  investmentId: string,
  payload: IInvestment,
): Promise<IInvestment> => {
  const investment = await Investment.findOneAndUpdate(
    { userId: userId, _id: investmentId },
    payload,
  );
  if (!investment)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved investment',
    );

  return investment;
};

export const InvestmentServices = {
  createInvestmentInDB,
  getInvestmentFromDB,
  updateInvestmentInDB,
};
