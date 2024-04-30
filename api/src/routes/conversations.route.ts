import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  getConversationsForUser,
  getConversationById,
} from "../controllers/conversationController";
export async function conversationRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      onRequest: app.authenticate,
    },
    getConversationsForUser,
  );
  app.get(
    "/:conversationId",
    {
      onRequest: app.authenticate,
      preHandler: app.userHasPermissionToConversation,
    },
    getConversationById,
  );
  app.log.info("conversation routes registered");
}
