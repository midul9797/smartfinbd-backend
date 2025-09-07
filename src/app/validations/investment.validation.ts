import { z } from 'zod';

const createInvestmentZodSchema = z.object({
  body: z.object({
    type: z.enum([
      'sanchayapatra_poribar',
      'sanchayapatra_pensioner',
      'dps',
      'mutual_fund_one_time',
      'mutual_fund_monthly',
      'stock',
      'fixed_deposit',
    ]),
    investAmount: z.number().min(0, 'Investment amount must be non-negative'),
    expire: z.number().min(0, 'Expiry must be non-negative'),
    expectedMonthlyReturn: z
      .number()
      .min(0, 'Expected monthly return must be non-negative')
      .optional(),
    expectedReturn: z
      .number()
      .min(0, 'Expected return must be non-negative')
      .optional(),
    total: z.number().min(0, 'Total must be non-negative'),
    interestRate: z
      .number()
      .min(0, 'Interest rate must be non-negative')
      .optional(),
    interest: z.number().min(0, 'Interest must be non-negative').optional(),
    minimumReturn: z
      .number()
      .min(0, 'Minimum return must be non-negative')
      .optional(),
    averageReturn: z
      .number()
      .min(0, 'Average return must be non-negative')
      .optional(),
    maxReturn: z.number().min(0, 'Max return must be non-negative').optional(),
  }),
});

const updateInvestmentZodSchema = z.object({
  body: z.object({
    type: z
      .enum([
        'sanchayapatra_poribar',
        'sanchayapatra_pensioner',
        'dps',
        'mutual_fund_one_time',
        'mutual_fund_monthly',
        'stock',
        'fixed_deposit',
      ])
      .optional(),
    investAmount: z
      .number()
      .min(0, 'Investment amount must be non-negative')
      .optional(),
    expire: z.number().min(0, 'Expiry must be non-negative').optional(),
    userId: z.string().optional(),
    expectedMonthlyReturn: z
      .number()
      .min(0, 'Expected monthly return must be non-negative')
      .optional(),
    expectedReturn: z
      .number()
      .min(0, 'Expected return must be non-negative')
      .optional(),
    total: z.number().min(0, 'Total must be non-negative').optional(),
    interestRate: z
      .number()
      .min(0, 'Interest rate must be non-negative')
      .optional(),
    interest: z.number().min(0, 'Interest must be non-negative').optional(),
    minimumReturn: z
      .number()
      .min(0, 'Minimum return must be non-negative')
      .optional(),
    averageReturn: z
      .number()
      .min(0, 'Average return must be non-negative')
      .optional(),
    maxReturn: z.number().min(0, 'Max return must be non-negative').optional(),
  }),
});

export const InvestmentValidation = {
  createInvestmentZodSchema,
  updateInvestmentZodSchema,
};
