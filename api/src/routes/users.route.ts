import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser, authenticateUser } from "../controllers/userController";
export async function userRoutes(app: FastifyInstance) {
  app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "/ route hit" });
  });
  app.post("/register", createUser);
  app.post(
    "/login",
    {
      preHandler: app["authenticateBasic"],
    },
    authenticateUser,
  );
  app.get(
    "/validateToken",
    {
      preHandler: app.authenticate,
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      reply.send({ message: "Token is valid" });
    },
  );
  app.log.info("user routes registered");
}
