/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../../config';
import { IChatRequest } from '../interfaces/chat.interface';
import User from '../models/user.model';
import FinancialProfile from '../models/financial.profile.model';
import RiskAssessment from '../models/risk.assessment.model';
import Chat from '../models/chat.model';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(config.gemini.api_key as string);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Function to detect if text is in Bangla
const isBangla = (text: string): boolean => {
  const banglaRegex = /[\u0980-\u09FF]/;
  return banglaRegex.test(text);
};

const sendMessage = async (
  payload: IChatRequest,
  userId: string,
): Promise<{ answer: string }> => {
  const { question, recentMessage } = payload;

  try {
    // Detect the language of the current question
    const isQuestionInBangla = isBangla(question);
    const responseLanguage = isQuestionInBangla ? 'Bangla' : 'English';

    // Build context from recent messages
    let context = '';
    if (recentMessage && recentMessage.length > 0) {
      context = recentMessage
        .map(
          (msg, index) =>
            `Q${index + 1}: ${msg.question}\nA${index + 1}: ${msg.answer}`,
        )
        .join('\n\n');
    }

    // Get user's financial profile and risk assessment for context
    const user = await User.findById(userId);
    const financialProfile = await FinancialProfile.findOne({ userId });
    const riskAssessment = await RiskAssessment.findOne({ userId });

    // Build the prompt with financial context and language instruction
    let prompt = `You are a financial advisor AI assistant. Please provide helpful, accurate, and personalized financial advice based on the user's question and context.

IMPORTANT: The user's question is in ${responseLanguage}. Please respond in ${responseLanguage} only.

Current Question: ${question}

${context ? `Previous Conversation Context:\n${context}\n\n` : ''}

${
  financialProfile
    ? `User's Financial Profile:
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

`
    : ''
}

${
  riskAssessment
    ? `User's Risk Assessment Profile:
- Risk Tolerance: ${riskAssessment.riskTolerance || 'Not assessed'}
- Investment Experience: ${riskAssessment.investmentExperience || 'Not assessed'}
- Investment Horizon: ${riskAssessment.investmentHorizon || 'Not assessed'}
- Liquidity Needs: ${riskAssessment.liquidityNeeds || 'Not assessed'}
- Assessment Score: ${riskAssessment.assessmentScore || 'Not calculated'}

`
    : ''
}

Please provide a comprehensive, helpful response that takes into account the user's financial situation and goals. Keep your response professional, clear, and actionable. 

IMPORTANT: Your response must not exceed 600 words. Be concise and to the point while providing valuable information.

Respond in ${responseLanguage}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();
    const chat = await Chat.create({
      question,
      answer,
      userId,
    });
    if (!chat) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create chat',
      );
    }
    return {
      answer,
    };
  } catch (error) {
    console.error('Error generating response with Gemini:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to generate response',
    );
  }
};

export const ChatServices = {
  sendMessage,
};
