import { z } from 'zod';

const sendMessageZodSchema = z.object({
  body: z.object({
    question: z.string(),
    recentMessage: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});
export const ChatValidation = { sendMessageZodSchema };
