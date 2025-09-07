/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { ILoginUser, ILoginUserResponse } from '../interfaces/auth.interface';
import User from '../models/user.model';

const loginUser = async (
  loginData: ILoginUser,
): Promise<ILoginUserResponse> => {
  const { email, password } = loginData;
  const isUserExist = await User.isUserExist(email, 'email');
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find user');
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
