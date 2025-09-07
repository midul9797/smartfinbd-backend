import { Model, Types } from 'mongoose';
import { IInvestment } from './investment.interface';

export type IFinancialProfile = {
  monthlyIncome: number;
  monthlyExpenses: number;
  currentSavings: number;
  dependents: number;
  employmentType:
    | 'government'
    | 'private'
    | 'business'
    | 'freelance'
    | 'student'
    | 'retired'
    | 'other';
  incomeStability: 'stable' | 'variable' | 'irregular';
  hasInsurance: boolean;
  hasEmergencyFund: boolean;
  debtAmount?: number;
  financialGoals: string[]; // e.g., ['retirement', 'house', 'education']
  existingInvestments?: IInvestment[];
  userId?: Types.ObjectId;
  updatedAt?: Date;
};

export type FinancialProfileModel = Model<IFinancialProfile>;
