import { JWT } from "@fastify/jwt";
import type { User } from "../types/userTypes";
// adding jwt property to req
// authenticate property to FastifyInstance
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    cookies: any;
    unsignCookie: any;
    user: User;
  }
  export interface FastifyInstance {
    authenticate: any;
    userHasPermissionToConversation: any;
    userHasPermissionToUserInfo: any;
    authenticateBasic: any;
    unsignCookie: any;
  }
  interface FastifyReply {
    setCookie: (name: string, value: string, options: any) => void;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: User;
  }
}
