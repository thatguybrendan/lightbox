import { PrismaClient } from "@prisma/client";
import type { Conversation, Message, User } from "@prisma/client";

const prisma = new PrismaClient();

const createMessage = async (
  senderId: User["id"],
  conversationId: Conversation["id"],
  content: Message["content"],
): Promise<Message> => {
  return await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
    },
  });
};

const getMessagesForConversation = async (
  conversationId: Conversation["id"],
  userId: User["id"],
): Promise<Message[]> => {
  return await prisma.message.findMany({
    include: { conversation: true },
    orderBy: { createdAt: "desc" },
    where: {
      AND: [
        { conversationId },
        {
          OR: [
            { conversation: { repId: userId } },
            { conversation: { customerId: userId } },
          ],
        },
      ],
    },
  });
};

export default { createMessage, getMessagesForConversation };
