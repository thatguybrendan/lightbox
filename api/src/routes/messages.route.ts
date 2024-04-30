import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  createMessage,
  getMessagesForConversation,
} from "../controllers/messageController";
export async function messageRoutes(app: FastifyInstance) {
  app.get(
    "/messages",
    {
      onRequest: app.authenticate,
    },
    getMessagesForConversation,
  );
  app.post(
    "/messages",
    {
      onRequest: app.authenticate,
    },
    createMessage,
  );
  app.log.info("message routes registered");
}
