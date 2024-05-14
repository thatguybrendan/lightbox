import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  createUser,
  authenticateUser,
  getUserById,
  getUser,
} from "../controllers/userController";
export async function userRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      onRequest: app.authenticate,
    },
    getUser,
  );
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
      onRequest: app.authenticate,
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      reply.send({ message: "Token is valid" });
    },
  );
  app.get(
    "/:userId",
    {
      onRequest: app.authenticate,
      preHandler: app.userHasPermissionToUserInfo,
    },
    getUserById,
  );

  app.log.info("user routes registered");
}
