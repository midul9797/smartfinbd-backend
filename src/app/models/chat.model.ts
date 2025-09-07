import { model, Schema } from 'mongoose';
import { IChat, IChatModel } from '../interfaces/chat.interface';

const chatSchema = new Schema<IChat>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Chat = model<IChat, IChatModel>('Chat', chatSchema);

export default Chat;
