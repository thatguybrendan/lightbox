import { User } from "../types/userTypes";

const userService = require("../services/userService");

export const createUser = async (req: { body: User }): Promise<User> => {
  const user = req.body;
  const newUser = await userService.createUser(user);
  return newUser;
};

export const getUserById = async (req: { params: { id: string } }) => {
  const id = parseInt(req.params.id);
  const user = await userService.getUserById(id);
  return user;
};
