import { Model, Types } from 'mongoose';

export type IInvestment = {
  type:
    | 'sanchayapatra_poribar'
    | 'sanchayapatra_pensioner'
    | 'dps'
    | 'mutual_fund_one_time'
    | 'mutual_fund_monthly'
    | 'stock'
    | 'fixed_deposit';
  investAmount: number;
  expire: number;
  userId: Types.ObjectId;
  expectedMonthlyReturn?: number;
  expectedReturn?: number;
  total: number;
  interestRate?: number;
  interest?: number;
  minimumReturn?: number;
  averageReturn?: number;
  maxReturn?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type InvestmentModel = Model<IInvestment>;
