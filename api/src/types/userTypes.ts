export type Customer = {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
};

export type Rep = {
  id: number;
  name: string;
  email: string;
  isAdmin?: true;
};

export type User = Customer | Rep;
export type NewUser = Omit<User, "id"> & { password: string };
export class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}
