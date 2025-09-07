import { Model, Types } from 'mongoose';
import { IRiskAssessment } from './risk.assessment.interface';
import { IFinancialProfile } from './financial.profile.interface';
import { IPreferences } from './preferences.interfaces';
export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  age: number;
  gender?: 'male' | 'female' | null;
  occupation?: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isBiometricActive: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  monthlyIncome?: number;
  monthlySavings?: number;
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
  totalInvestment?: number;
  goalProgress?: number;
  financialProfile?: Types.ObjectId | IFinancialProfile;
  riskAssessment?: Types.ObjectId | IRiskAssessment;
  preferences: Types.ObjectId | IPreferences;
};

export type UserModel = {
  isUserExist(value: string, field: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
