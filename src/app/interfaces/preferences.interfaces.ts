import { Model, Types } from 'mongoose';

export type IPreferences = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;

  language: 'en' | 'bn';
  currency: 'BDT' | 'USD';
  notifications: {
    email: boolean;
    push: boolean;
    sms?: boolean;
  };
  theme: 'light' | 'dark';
};

export type PreferencesModel = Model<IPreferences>;
