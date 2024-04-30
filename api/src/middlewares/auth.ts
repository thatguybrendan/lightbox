import fp from "fastify-plugin";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import fjwt, { FastifyJWT } from "@fastify/jwt";

import userService from "../services/userService";
import { UserNotFoundError } from "../types/userTypes";

interface LoginFormBodyType {
  email: string;
  password: string;
}

export default fp(async (app: FastifyInstance) => {
  app.register(fjwt, { secret: "supersecretcode-CHANGE_THIS-USE_ENV_FILE" }); // TODO: use env file
  // cookies
  app.register(require("@fastify/cookie"), {
    secret: "some-secret-key", // TODO: use env file
  });
  app.addHook("onRequest", (req, res, next) => {
    req.jwt = app.jwt;
    req.unsignCookie = app.unsignCookie;
    return next();
  });

  app.decorate(
    "authenticateBasic",
    async (
      req: FastifyRequest<{ Body: LoginFormBodyType }>,
      reply: FastifyReply,
    ): Promise<void> => {
      const { email, password } = req.body;
      try {
        const user = await userService.authenticate(email, password);
        req.user = user;
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          return reply.code(404);
        }
      }
    },
  );

  app.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { value: token } = req.unsignCookie(req.cookies.access_token);
      if (!token) {
        return reply.status(401).send({ message: "Authentication required" });
      }
      try {
        // here decoded will be a different type by default but we want it to be of user-payload type
        const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
        req.user = decoded;
      } catch (error) {
        console.error(error);
        return reply.status(401).send({ message: "Authentication required" });
      }
    },
  );
});
