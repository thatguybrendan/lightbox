import { User, NewUser, UserNotFoundError } from "../types/userTypes";
import { User as PrismaUser } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

import userService from "../services/userService";

const setCookie = (reply: FastifyReply, user: User, token: string) => {
  reply.setCookie("access_token", token, {
    domain: "your.domain", // Use ENV file.
    path: "/",
    signed: true,
    secure: true, // send cookie over HTTPS only
    httpOnly: true,
    sameSite: true, // alternative CSRF protection
  });
};

export const getUserById = async (
  req: FastifyRequest<{ Params: { userId: string } }>,
) => {
  const userId = Number(req.params.userId);
  const user = await userService.getUserById(userId);
  return user;
};

export async function authenticateUser(
  req: FastifyRequest<{
    Body: { email: string; password: string };
  }>,
  reply: FastifyReply,
) {
  const { user } = req;
  const token = req.jwt.sign(user);
  setCookie(reply, user, token);
  return reply.send({ ...user });
}

export async function createUser(
  req: FastifyRequest<{
    Body: NewUser;
  }>,
  reply: FastifyReply,
) {
  const { password, email, name } = req.body;
  const userExists = await userService.userExists(email);
  if (userExists) {
    return reply.code(401).send({
      message: "User already exists with this email",
    });
  }

  try {
    const newUser = await userService.createUser(password, email, name);
    const token = req.jwt.sign(newUser);
    setCookie(reply, newUser, token);
    return reply.send({ ...newUser });
  } catch (error) {
    return reply.code(500).send(error); // TODO: Don't send the error to the client
  }
}
