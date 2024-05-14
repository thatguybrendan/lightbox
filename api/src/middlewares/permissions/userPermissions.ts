import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import userService from "../../services/userService";

export default fp(async (app: FastifyInstance) => {
  app.decorate(
    "userHasPermissionToUserInfo",
    async (
      req: FastifyRequest<{
        Params: {
          userId: string;
        };
      }>,
      reply: FastifyReply,
    ): Promise<void> => {
      const user = req.user;
      const isAdmin = await userService.userIsAdmin(Number(user.id));
      const isOwnUser = Number(req.params.userId) === Number(user.id);

      // If a user is not an admin, or the user is not the same as the user being requested.
      if (!isAdmin && !isOwnUser) {
        reply.code(403).send({ error: "You do not have access to this user" });
      }
    },
  );
});
