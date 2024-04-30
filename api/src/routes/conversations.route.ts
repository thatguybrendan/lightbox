import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getConversationsForUser } from "../controllers/conversationController";
export async function conversationRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
    },
    getConversationsForUser,
  );
  app.log.info("conversation routes registered");
}
