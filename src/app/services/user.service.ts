/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';
import { startSession, Types } from 'mongoose';
import { PreferencesServices } from './preferences.service';

const createUserInDB = async (payload: IUser): Promise<IUser> => {
  const session = await startSession();
  session.startTransaction();
  const createdUser = await User.create(payload);
  if (!createdUser)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  const preferences = await PreferencesServices.createPreferencesInDB({
    userId: new Types.ObjectId(createdUser._id),
    language: 'bn',
    currency: 'BDT',
    notifications: {
      email: false,
      push: false,
    },
    theme: 'dark',
  });
  if (!preferences) {
    session.abortTransaction();
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create preferences');
  }
  session.commitTransaction();
  session.endSession();
  return createdUser;
};
const getProfileFromDB = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  return user;
};
const changePasswordInDB = async (
  userId: string,
  payload: { old_password: string; new_password: string },
) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find user');
  if (
    user.password &&
    !(await User.isPasswordMatched(payload.old_password, user.password))
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  user.password = payload.new_password;
  user.save();
  return true;
};
const updateProfileInDB = async (userId: string, payload: IUser) => {
  const user = await User.findByIdAndUpdate({ _id: userId }, payload);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find user');

  return true;
};
export const UserServices = {
  createUserInDB,
  getProfileFromDB,
  changePasswordInDB,
  updateProfileInDB,
};
