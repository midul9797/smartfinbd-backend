import { z } from 'zod';

const createFinancialProfileZodSchema = z.object({
  body: z.object({
    monthlyIncome: z
      .number()
      .min(0, 'Monthly income must be non-negative')
      .optional(),
    monthlyExpenses: z
      .number()
      .min(0, 'Monthly expenses must be non-negative')
      .optional(),
    currentSavings: z
      .number()
      .min(0, 'Current savings must be non-negative')
      .optional(),
    dependents: z
      .number()
      .int()
      .min(0, 'Dependents must be a non-negative integer')
      .optional(),
    employmentType: z
      .enum([
        'government',
        'private',
        'business',
        'freelance',
        'student',
        'retired',
        'other',
      ])
      .optional(),
    incomeStability: z.enum(['stable', 'variable', 'irregular']).optional(),
    hasInsurance: z.boolean().optional(),
    hasEmergencyFund: z.boolean().optional(),
    debtAmount: z
      .number()
      .min(0, 'Debt amount must be non-negative')
      .optional(),
    financialGoals: z.array(z.string()).optional(),
    existingInvestments: z.array(z.any()).optional(),
  }),
});
const updateFinancialProfileZodSchema = z.object({
  body: z.object({
    monthlyIncome: z
      .number()
      .min(0, 'Monthly income must be non-negative')
      .optional(),
    monthlyExpenses: z
      .number()
      .min(0, 'Monthly expenses must be non-negative')
      .optional(),
    currentSavings: z
      .number()
      .min(0, 'Current savings must be non-negative')
      .optional(),
    dependents: z
      .number()
      .int()
      .min(0, 'Dependents must be a non-negative integer')
      .optional(),
    employmentType: z
      .enum([
        'government',
        'private',
        'business',
        'freelance',
        'student',
        'retired',
        'other',
      ])
      .optional(),
    incomeStability: z.enum(['stable', 'variable', 'irregular']).optional(),
    hasInsurance: z.boolean().optional(),
    hasEmergencyFund: z.boolean().optional(),
    debtAmount: z
      .number()
      .min(0, 'Debt amount must be non-negative')
      .optional(),
    financialGoals: z.array(z.string()).optional(),
    existingInvestments: z.array(z.any()).optional(),
  }),
});

export const FinancialProfileValidation = {
  updateFinancialProfileZodSchema,
  createFinancialProfileZodSchema,
};
