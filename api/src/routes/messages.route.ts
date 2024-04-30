import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  createMessage,
  getMessagesForConversation,
} from "../controllers/messageController";
export async function messageRoutes(app: FastifyInstance) {
  app.get(
    "/messages",
    {
      preHandler: app.authenticate,
    },
    getMessagesForConversation,
  );
  app.post(
    "/messages",
    {
      preHandler: app.authenticate,
    },
    createMessage,
  );
  app.log.info("message routes registered");
}
