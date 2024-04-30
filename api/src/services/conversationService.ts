import { PrismaClient } from "@prisma/client";
import type { Conversation } from "@prisma/client";
import type { User } from "../types/userTypes";
import type { NewConversation } from "../types/conversationTypes";
import type { Customer, Rep } from "../types/userTypes";
import { get } from "http";

const prisma = new PrismaClient();

const createConversation = async (
  Conversation: NewConversation,
): Promise<Conversation> => {
  return await prisma.conversation.create({ data: Conversation });
};

const getConversationForCustomer = async (
  customer: Customer,
): Promise<Conversation> => {
  let conversation = await prisma.conversation.findUnique({
    where: { customerId: customer.id },
  });
  if (!conversation) {
    conversation = await createConversation({ customerId: customer.id });
  }
  return conversation;
};

const getConversationById = async (id: number): Promise<Conversation> => {
  return await prisma.conversation.findUniqueOrThrow({ where: { id } });
};

const userHasAccessToConversation = async (
  userId: User["id"],
  conversationId: Conversation["id"],
) => {
  const conversation = await getConversationById(conversationId);
  return conversation.customerId === userId || conversation.repId === userId;
};

const getConversationsForRep = async (rep: Rep): Promise<Conversation[]> => {
  return await prisma.conversation.findMany({ where: { repId: rep.id } });
};

const assignRepToConversation = async (
  conversationId: Conversation["id"],
  repId: User["id"],
): Promise<Conversation> => {
  return await prisma.conversation.update({
    where: { id: conversationId },
    data: { repId },
  });
};

export default {
  getConversationForCustomer,
  getConversationsForRep,
  assignRepToConversation,
  getConversationById,
  userHasAccessToConversation,
};
