import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import userService from "../../services/userService";

export default fp(async (app: FastifyInstance) => {
  app.decorate(
    "userHasPermissionToUserInfo",
    async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
      const user = req.user;
      const userId = Number(user.id);
      const isAdmin = await userService.userIsAdmin(userId);

      if (!isAdmin) {
        reply.code(403).send({ error: "You do not have access to this user" });
      }
    },
  );
});
