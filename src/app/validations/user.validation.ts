import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters'),
    phone: z.string().optional(),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .min(1, 'Age must be a positive number'),
  }),
});

const updateProfileZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    age: z.number().min(1, 'Age must be a positive number').optional(),
    gender: z.enum(['male', 'female']).optional(),
    occupation: z.string().optional(),
    profilePicture: z.string().optional(),
    monthlyIncome: z.number().optional(),
    monthlySavings: z.number().optional(),
    riskTolerance: z
      .enum(['conservative', 'moderate', 'aggressive'])
      .optional(),
    totalInvestment: z.number().optional(),
    goalProgress: z.number().optional(),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    old_password: z.string({
      required_error: 'Old password is required',
    }),
    new_password: z
      .string({
        required_error: 'New password is required',
      })
      .min(8, 'Password must be at least 8 characters'),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateProfileZodSchema,
  changePasswordZodSchema,
};
