import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import conversationService from "../../services/conversationService";

export default fp(async (app: FastifyInstance) => {
  app.decorate(
    "userHasPermissionToConversation",
    async (
      req: FastifyRequest<{
        Params: { conversationId: string };
      }>,
      reply: FastifyReply,
    ): Promise<void> => {
      const user = req.user;
      const conversationId = Number(req.params.conversationId);

      if (user.isAdmin) {
        return;
      }

      const hasAccess = await conversationService.userHasAccessToConversation(
        user.id,
        conversationId,
      );

      if (!hasAccess) {
        reply
          .code(403)
          .send({ error: "You do not have access to this conversation" });
      }
    },
  );
});
