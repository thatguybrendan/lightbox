import { User, Customer, Rep } from "../types/userTypes";
import { Conversation } from "@prisma/client";
import conversationService from "../services/conversationService";

export const getConversationsForUser = async (req: {
  user: User;
}): Promise<Conversation[]> => {
  const user = req.user;
  if (user.isAdmin) {
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
