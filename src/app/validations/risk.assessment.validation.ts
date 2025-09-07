import { z } from 'zod';

const createRiskAssessmentZodSchema = z.object({
  body: z.object({
    riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
    tolerance: z.enum(['conservative', 'moderate', 'aggressive']).optional(),
    investmentExperience: z.enum(['beginner', 'intermediate', 'advanced']),
    investmentHorizon: z.enum(['short', 'medium', 'long']),
    liquidityNeeds: z.enum(['low', 'medium', 'high']),
    assessmentScore: z.number().min(0, 'Assessment score must be non-negative'),
    completedAt: z.date().optional(),
    userId: z.string().optional(),
    score: z.number().min(0, 'Score must be non-negative').optional(),
    answers: z
      .array(
        z.object({
          questionId: z.string(),
          answer: z.string(),
          score: z.number(),
        }),
      )
      .optional(),
  }),
});

const updateRiskAssessmentZodSchema = z.object({
  body: z.object({
    riskTolerance: z
      .enum(['conservative', 'moderate', 'aggressive'])
      .optional(),
    tolerance: z.enum(['conservative', 'moderate', 'aggressive']).optional(),
    investmentExperience: z
      .enum(['beginner', 'intermediate', 'advanced'])
      .optional(),
    investmentHorizon: z.enum(['short', 'medium', 'long']).optional(),
    liquidityNeeds: z.enum(['low', 'medium', 'high']).optional(),
    assessmentScore: z
      .number()
      .min(0, 'Assessment score must be non-negative')
      .optional(),
    completedAt: z.date().optional(),
    userId: z.string().optional(),
    score: z.number().min(0, 'Score must be non-negative').optional(),
    answers: z
      .array(
        z.object({
          questionId: z.string(),
          answer: z.string(),
          score: z.number(),
        }),
      )
      .optional(),
  }),
});

export const RiskAssessmentValidation = {
  createRiskAssessmentZodSchema,
  updateRiskAssessmentZodSchema,
};
