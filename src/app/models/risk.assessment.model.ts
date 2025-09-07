import { Schema, model } from 'mongoose';
import {
  IRiskAssessment,
  RiskAssessmentModel,
} from '../interfaces/risk.assessment.interface';

const riskAssessmentSchema = new Schema<IRiskAssessment>(
  {
    riskTolerance: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive'],
      required: true,
    },
    tolerance: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive'],
      required: false,
    },
    investmentExperience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    investmentHorizon: {
      type: String,
      enum: ['short', 'medium', 'long'],
      required: true,
    },
    liquidityNeeds: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    assessmentScore: {
      type: Number,
      required: true,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    score: {
      type: Number,
      required: false,
    },
    answers: {
      type: [
        {
          questionId: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
          score: {
            type: Number,
            required: true,
          },
        },
      ],
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

const RiskAssessment = model<IRiskAssessment, RiskAssessmentModel>(
  'RiskAssessment',
  riskAssessmentSchema,
);

export default RiskAssessment;
