import { Schema, model } from 'mongoose';
import {
  IFinancialProfile,
  FinancialProfileModel,
} from '../interfaces/financial.profile.interface';

const financialProfileSchema = new Schema<IFinancialProfile>(
  {
    monthlyIncome: {
      type: Number,
      required: true,
    },
    monthlyExpenses: {
      type: Number,
      required: true,
    },
    currentSavings: {
      type: Number,
      required: true,
    },
    dependents: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
      enum: [
        'government',
        'private',
        'business',
        'freelance',
        'student',
        'retired',
        'other',
      ],
      required: true,
    },
    incomeStability: {
      type: String,
      enum: ['stable', 'variable', 'irregular'],
      required: true,
    },
    hasInsurance: {
      type: Boolean,
      required: true,
    },
    hasEmergencyFund: {
      type: Boolean,
      required: true,
    },
    debtAmount: {
      type: Number,
      required: false,
    },
    financialGoals: {
      type: [String],
      required: true,
    },
    existingInvestments: {
      type: [Schema.Types.ObjectId],
      ref: 'Investment',
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const FinancialProfile = model<IFinancialProfile, FinancialProfileModel>(
  'FinancialProfile',
  financialProfileSchema,
);

export default FinancialProfile;
