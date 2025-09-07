/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { IFinancialProfile } from '../interfaces/financial.profile.interface';
import FinancialProfile from '../models/financial.profile.model';
import { Types } from 'mongoose';
import RiskAssessment from '../models/risk.assessment.model';
import config from '../../config';
const genAI = new GoogleGenerativeAI(config.gemini.api_key as string);

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
const createFinancialProfileInDB = async (
  userId: string,
  payload: IFinancialProfile,
): Promise<IFinancialProfile> => {
  const createdFinancialProfile = await FinancialProfile.create({
    ...payload,
    userId: userId,
  });
  if (!createdFinancialProfile)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
  return createdFinancialProfile;
};
const getFinancialProfileFromDB = async (
  userId: string,
): Promise<IFinancialProfile> => {
  const financialProfile = await FinancialProfile.findOne({ userId: userId });
  if (!financialProfile)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieved financial profile',
    );
  return financialProfile;
};

const updateFinancialProfileInDB = async (
  userId: string,
  payload: IFinancialProfile,
): Promise<IFinancialProfile> => {
  const financialProfile = await FinancialProfile.findOneAndUpdate(
    { userId: userId },
    payload,
  );
  if (!financialProfile) {
    const createdFinancialProfile = await FinancialProfile.create({
      ...payload,
      userId: userId,
    });
    if (!createdFinancialProfile)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create financial profile',
      );
    return createdFinancialProfile;
  }

  return financialProfile;
};
const predictFinancialProfile = async (
  userId: string,
): Promise<{
  suitabilityScore: number;
  recommendInvestmentAmount: number;
  recommendInvestmentType: string;
  riskLevel: string;
  reason: string;
}> => {
  try {
    // Get user's financial profile and risk assessment
    const financialProfile = await FinancialProfile.findOne({ userId });
    const riskAssessment = await RiskAssessment.findOne({ userId });

    if (!financialProfile) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Financial profile not found');
    }

    // Build risk assessment section
    const riskAssessmentInfo = riskAssessment
      ? `
Risk Assessment Profile:
- Risk Tolerance: ${riskAssessment.riskTolerance || 'Not assessed'}
- Investment Experience: ${riskAssessment.investmentExperience || 'Not assessed'}
- Investment Horizon: ${riskAssessment.investmentHorizon || 'Not assessed'}
- Liquidity Needs: ${riskAssessment.liquidityNeeds || 'Not assessed'}
- Assessment Score: ${riskAssessment.assessmentScore || 'Not calculated'}

`
      : `
Risk Assessment Profile: Not completed - User has not taken risk assessment yet.

`;

    const prompt = `Based on the following financial profile and risk assessment, provide a comprehensive investment recommendation. You must respond in the exact JSON format specified below.

IMPORTANT: All text responses must be in Bangla (Bengali) language only.

Financial Profile:
- Monthly Income: ${financialProfile.monthlyIncome || 'Not specified'}
- Monthly Expenses: ${financialProfile.monthlyExpenses || 'Not specified'}
- Current Savings: ${financialProfile.currentSavings || 'Not specified'}
- Dependents: ${financialProfile.dependents || 'Not specified'}
- Employment Type: ${financialProfile.employmentType || 'Not specified'}
- Income Stability: ${financialProfile.incomeStability || 'Not specified'}
- Has Insurance: ${financialProfile.hasInsurance ? 'Yes' : 'No'}
- Has Emergency Fund: ${financialProfile.hasEmergencyFund ? 'Yes' : 'No'}
- Debt Amount: ${financialProfile.debtAmount || 'None'}
- Financial Goals: ${financialProfile.financialGoals?.join(', ') || 'Not specified'}

${riskAssessmentInfo}

Available Investment Options:
1. sanchayapatra_poribar - Government savings certificate for families
2. sanchayapatra_pensioner - Government savings certificate for pensioners
3. dps - Deposit Pension Scheme
4. mutual_fund_one_time - One-time mutual fund investment
5. mutual_fund_monthly - Monthly SIP mutual fund investment
6. stock - Stock market investment
7. fixed_deposit - Bank fixed deposit

IMPORTANT: You must respond with a valid JSON object in this exact format:
{
  "suitabilityScore": <number between 1-100>,
  "recommendInvestmentAmount": <number - recommended amount to invest>,
  "recommendInvestmentType": "<one of the 7 investment types listed above>",
  "riskLevel": "<conservative|moderate|aggressive>",
  "reason": "<detailed explanation in Bangla of why this investment is recommended based on their profile>"
}

Consider the user's risk tolerance, investment horizon, liquidity needs, financial goals, and current financial situation to make the recommendation. All text responses must be in Bangla language.`;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const answer = response.text();

    // Parse the JSON response
    try {
      // Extract JSON from the response, handling markdown code blocks
      let jsonString = answer.trim();

      // Remove markdown code block formatting if present
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString
          .replace(/^```json\s*/, '')
          .replace(/\s*```$/, '');
      } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsedResponse = JSON.parse(jsonString);

      // Validate the response format
      if (
        typeof parsedResponse.suitabilityScore === 'number' &&
        typeof parsedResponse.recommendInvestmentAmount === 'number' &&
        typeof parsedResponse.recommendInvestmentType === 'string' &&
        typeof parsedResponse.riskLevel === 'string' &&
        typeof parsedResponse.reason === 'string' &&
        parsedResponse.suitabilityScore >= 1 &&
        parsedResponse.suitabilityScore <= 100 &&
        parsedResponse.recommendInvestmentAmount > 0 &&
        ['conservative', 'moderate', 'aggressive'].includes(
          parsedResponse.riskLevel,
        ) &&
        [
          'sanchayapatra_poribar',
          'sanchayapatra_pensioner',
          'dps',
          'mutual_fund_one_time',
          'mutual_fund_monthly',
          'stock',
          'fixed_deposit',
        ].includes(parsedResponse.recommendInvestmentType)
      ) {
        return parsedResponse;
      } else {
        throw new Error('Invalid response format from AI');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback response if parsing fails
      return {
        suitabilityScore: 50,
        recommendInvestmentAmount: 10000,
        recommendInvestmentType: 'fixed_deposit',
        riskLevel: 'conservative',
        reason:
          'AI প্রতিক্রিয়া পার্স করতে অক্ষম। রক্ষণশীল ফিক্সড ডিপোজিট সুপারিশে ফিরে যাচ্ছি।',
      };
    }
  } catch (error) {
    console.error('Error generating financial prediction:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to generate financial prediction',
    );
  }
};
export const FinancialProfileServices = {
  createFinancialProfileInDB,
  getFinancialProfileFromDB,
  updateFinancialProfileInDB,
  predictFinancialProfile,
};
