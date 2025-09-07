/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { IPreferences } from '../interfaces/preferences.interfaces';
import Preferences from '../models/preferences.model';

const createPreferencesInDB = async (
  payload: IPreferences,
): Promise<IPreferences | null> => {
  const createdPreferences = await Preferences.create(payload);
  if (!createdPreferences)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload notification');

  return createdPreferences;
};

const getPreferencesFromDB = async (
  userId: string,
): Promise<IPreferences | null> => {
  const preferences = await Preferences.findOne({ userId: userId });
  if (!preferences)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get preferences');

  return preferences;
};

const updatePreferencesInDB = async (
  userId: string,
  payload: IPreferences,
): Promise<IPreferences | null> => {
  const preferences = await Preferences.findOneAndUpdate(
    { userId: userId },
    payload,
  );
  if (!preferences)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update preferences');

  return preferences;
};
// Export the notification services
export const PreferencesServices = {
  createPreferencesInDB,
  getPreferencesFromDB,
  updatePreferencesInDB,
};
