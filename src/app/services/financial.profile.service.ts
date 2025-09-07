/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

import { IFinancialProfile } from '../interfaces/financial.profile.interface';
import FinancialProfile from '../models/financial.profile.model';
import { Types } from 'mongoose';
const createFinancialProfileInDB = async (
  userId: string,
  payload: IFinancialProfile,
): Promise<IFinancialProfile> => {
  const createdFinancialProfile = await FinancialProfile.create({
    ...payload,
    userId: userId,
  });
  if (!createdFinancialProfile)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
  return createdFinancialProfile;
};
const getFinancialProfileFromDB = async (
  userId: string,
): Promise<IFinancialProfile> => {
  const financialProfile = await FinancialProfile.findOne({ userId: userId });
  if (!financialProfile)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved financial profile',
    );
  return financialProfile;
};

const updateFinancialProfileInDB = async (
  userId: string,
  payload: IFinancialProfile,
): Promise<IFinancialProfile> => {
  const financialProfile = await FinancialProfile.findOneAndUpdate(
    { userId: userId },
    payload,
  );
  if (!financialProfile) {
    const createdFinancialProfile = await FinancialProfile.create({
      ...payload,
      userId: userId,
    });
    if (!createdFinancialProfile)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create financial profile',
      );
    return createdFinancialProfile;
  }

  return financialProfile;
};

export const FinancialProfileServices = {
  createFinancialProfileInDB,
  getFinancialProfileFromDB,
  updateFinancialProfileInDB,
};
