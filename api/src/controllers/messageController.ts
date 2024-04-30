import messageService from "../services/messageService";
import { FastifyRequest } from "fastify";

export const createMessage = async (
  req: FastifyRequest<{
    Body: { content: string };
    Params: { conversationId: string };
  }>,
) => {
  const { body, user, params } = req;
  const content = body.content;
  const senderId = user.id;
  const conversationId = Number(params.conversationId);
  const message = await messageService.createMessage(
    senderId,
    conversationId,
    content,
  );
  return message;
};

export const getMessagesForConversation = async (
  req: FastifyRequest<{
    Params: { conversationId: string };
  }>,
) => {
  const { params, user } = req;
  const conversationId = Number(params.conversationId);
  const messages = await messageService.getMessagesForConversation(
    conversationId,
    user.id,
  );
  return messages;
};
