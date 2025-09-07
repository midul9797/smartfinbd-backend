import { z } from 'zod'; // Import zod for schema validation

// Define the schema for creating a notification
const updatePreferencesZodSchema = z.object({
  body: z.object({
    language: z.enum(['en', 'bn']).optional(),
    currency: z.enum(['BDT', 'USD']).optional(),
    notifications: z
      .object({
        email: z.boolean().optional(),
        push: z.boolean().optional(),
        sms: z.boolean().optional(),
      })
      .optional(),
    theme: z.enum(['light', 'dark']).optional(),
  }),
});

// Export the validation schema for creating a notification
export const PreferencesValidation = {
  updatePreferencesZodSchema,
};
