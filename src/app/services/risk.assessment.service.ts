/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

import RiskAssessment from '../models/risk.assessment.model';
import { IRiskAssessment } from '../interfaces/risk.assessment.interface';
const createRiskAssessmentInDB = async (
  userId: string,
  payload: IRiskAssessment,
): Promise<IRiskAssessment> => {
  const createdRiskAssessment = await RiskAssessment.create({
    ...payload,
    userId: userId,
  });
  if (!createdRiskAssessment)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create risk assessment',
    );
  return createdRiskAssessment;
};
const getRiskAssessmentFromDB = async (
  userId: string,
): Promise<IRiskAssessment[]> => {
  const riskAssessment = await RiskAssessment.find({ userId: userId });
  if (!riskAssessment)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved risk assessment',
    );
  return riskAssessment;
};

const updateRiskAssessmentInDB = async (
  userId: string,
  riskAssessmentId: string,
  payload: IRiskAssessment,
): Promise<IRiskAssessment> => {
  const riskAssessment = await RiskAssessment.findOneAndUpdate(
    { userId: userId, _id: riskAssessmentId },
    payload,
  );
  if (!riskAssessment)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved risk assessment',
    );

  return riskAssessment;
};

export const RiskAssessmentServices = {
  createRiskAssessmentInDB,
  getRiskAssessmentFromDB,
  updateRiskAssessmentInDB,
};
