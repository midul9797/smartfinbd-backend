import { Model, Types } from 'mongoose';

export type IRiskAssessment = {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  tolerance: 'conservative' | 'moderate' | 'aggressive'; // Alias for riskTolerance for backward compatibility
  investmentExperience: 'beginner' | 'intermediate' | 'advanced';
  investmentHorizon: 'short' | 'medium' | 'long';
  liquidityNeeds: 'low' | 'medium' | 'high';
  assessmentScore: number; // A calculated score based on answers
  completedAt?: Date;
  userId?: Types.ObjectId;
  score?: number;
  answers?: { questionId: string; answer: string; score: number }[];
};

export type RiskAssessmentModel = Model<IRiskAssessment>;
