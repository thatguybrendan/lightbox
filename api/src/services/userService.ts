import { PrismaClient } from "@prisma/client";
import type { User } from "../types/userTypes";
const prisma = new PrismaClient();

export const createUser = async (user: User): Promise<User> => {
  return await prisma.user.create({ data: user });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};
