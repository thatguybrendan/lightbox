import { User, Customer, Rep } from "../types/userTypes";
import { Conversation } from "@prisma/client";
import conversationService from "../services/conversationService";
import userService from "../services/userService";
import { FastifyRequest, FastifyReply } from "fastify";
import { NotFound } from "http-errors";

export const getConversationsForUser = async (
  req: FastifyRequest,
): Promise<Conversation[]> => {
  const user = req.user;
  const isAdmin = await userService.userIsAdmin(user.id);
  if (isAdmin) {
    const rep = user as Rep;
    const conversations = await conversationService.getConversationsForRep(rep);
    return conversations;
  } else {
    const customer = user as Customer;
    const conversation =
      await conversationService.getConversationForCustomer(customer);
    return [conversation];
  }
};

export const getConversationById = async (
  req: FastifyRequest<{
    Params: { conversationId: string };
  }>,
  reply: FastifyReply,
): Promise<Conversation> => {
  const conversationId = Number(req.params.conversationId);
  try {
    const conversation =
      await conversationService.getConversationById(conversationId);
    return conversation;
  } catch (error) {
    throw new NotFound("Conversation not found");
  }
};
