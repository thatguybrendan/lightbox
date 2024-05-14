import { post, get } from "../utils/client";

export const signIn = async (data: {
  email: string;
  password: string;
}): Promise<{ id: number; email: string }> => {
  const { email, password } = data;
  return post("user/login", { email, password });
};

export const getUser = (
  userId: number
): Promise<{ id: number; email: string }> => {
  return get(`user/${userId}`);
};

export const getSelf = (): Promise<{ id: number; email: string }> => {
  return get("user");
};
