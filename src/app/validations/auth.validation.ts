import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),

    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const createUserZodSchema = z.object({
  body: z.object({
    first_name: z.string({
      required_error: 'First Name is required',
    }),
    last_name: z.string({
      required_error: 'Last Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
export const AuthValidation = {
  loginZodSchema,
  createUserZodSchema,
};
