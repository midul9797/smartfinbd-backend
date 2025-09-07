import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { ChatValidation } from '../validations/chat.validation';
import { ChatController } from '../controllers/chat.controller';
import auth from '../middlewares/auth';

const router = express.Router();
router.post(
  '/',
  auth(),
  validateRequest(ChatValidation.sendMessageZodSchema),
  ChatController.sendMessage,
);

export const ChatRoute = router;
