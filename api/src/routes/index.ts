import { FastifyInstance } from "fastify";
import { userRoutes } from "./users.route";
import { conversationRoutes } from "./conversations.route";
import { messageRoutes } from "./messages.route";
import fp from "fastify-plugin";

export default fp(async (app: FastifyInstance) => {
  // Basic Healthcheck Route
  app.get("/healthcheck", (req, res) => {
    res.send({ message: "Success" });
  });
  app.register(userRoutes, { prefix: "api/user" });
  app.register(conversationRoutes, { prefix: "api/conversation" });
  app.register(messageRoutes, { prefix: "api/conversation/:conversationId" });
});
