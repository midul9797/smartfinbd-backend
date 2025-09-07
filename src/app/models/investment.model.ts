import { Schema, model } from 'mongoose';
import {
  IInvestment,
  InvestmentModel,
} from '../interfaces/investment.interface';

const investmentSchema = new Schema<IInvestment>(
  {
    type: {
      type: String,
      enum: [
        'sanchayapatra_poribar',
        'sanchayapatra_pensioner',
        'dps',
        'mutual_fund_one_time',
        'mutual_fund_monthly',
        'stock',
        'fixed_deposit',
      ],
      required: true,
    },
    investAmount: {
      type: Number,
      required: true,
    },
    expire: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expectedMonthlyReturn: {
      type: Number,
      required: false,
    },
    expectedReturn: {
      type: Number,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: false,
    },
    interest: {
      type: Number,
      required: false,
    },
    minimumReturn: {
      type: Number,
      required: false,
    },
    averageReturn: {
      type: Number,
      required: false,
    },
    maxReturn: {
      type: Number,
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

const Investment = model<IInvestment, InvestmentModel>(
  'Investment',
  investmentSchema,
);

export default Investment;
