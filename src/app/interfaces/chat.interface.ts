import { Model, Types } from 'mongoose';

export type IChatRequest = {
  recentMessage: {
    question: string;
    answer: string;
  }[];
  question: string;
};
export type IChatResponse = {
  answer: string;
};
export type IChat = {
  question: string;
  answer: string;
  userId: Types.ObjectId;
};
export type IChatModel = Model<IChat>;
