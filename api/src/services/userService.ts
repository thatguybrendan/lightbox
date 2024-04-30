import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { User, NewUser } from "../types/userTypes";
import { UserNotFoundError } from "../types/userTypes";
import type { User as PrismaUser } from "@prisma/client";
const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

/**
 * Prisma does not currently exclude natively, so we have to do it here.
 * Excluding password for obvious reasons.
 */
function exclude(user: PrismaUser): Omit<User, "password" | "isAdmin"> {
  const { password, isAdmin, ...rest } = user;
  return rest;
}

const createCustomer = async (user: NewUser): Promise<User> => {
  return exclude(await prisma.user.create({ data: user }));
};

const getUserById = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new UserNotFoundError();
  }
  return exclude(user);
};

const getUserByEmail = async (email: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new UserNotFoundError();
  }
  return exclude(user);
};

const userExists = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { email } });
  return !!user;
};

const createUser = async (
  password: string,
  email: string,
  name: string,
): Promise<User> => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      password: hash,
      email,
      name,
    },
  });
  return exclude(user);
};

const authenticate = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new UserNotFoundError();
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new UserNotFoundError();
  }

  // In this one case, we can keep the isAdmin field.
  // This should only ever be used internally, not sent to the client.
  return { ...exclude(user), isAdmin: user.isAdmin };
};

export default {
  createCustomer,
  getUserById,
  getUserByEmail,
  userExists,
  createUser,
  authenticate,
};
