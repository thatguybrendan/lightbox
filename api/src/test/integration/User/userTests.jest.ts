import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { createUser, getUserById } from "../../../controllers/userController";

describe("User Tests", () => {
  it("Should create and return a new admin user", async () => {
    const user = {
      email: "test@test.com",
      name: "Test User",
      isAdmin: true,
    };
    const newUser = await createUser({ body: user });
    expect(newUser.id).toBeDefined();
    expect(newUser.email).toBe(user.email);
    expect(newUser.name).toBe(user.name);
    expect(newUser.isAdmin).toBe(user.isAdmin);
  });

  it("Should return existing customer id if id matches.", async () => {
    // Test code here
    const testUser = {
      email: "test2@test.com",
      name: "Test User",
      isAdmin: false,
    };

    const { id } = await prisma.user.create({ data: testUser });

    const fetchedUser = await getUserById({ params: { id: `${id}` } });

    expect(fetchedUser.id).toBe(id);
    expect(fetchedUser.email).toBe(testUser.email);
    expect(fetchedUser.name).toBe(testUser.name);
    expect(fetchedUser.isAdmin).toBe(testUser.isAdmin);
  });
  it.skip("Should return customer information if requesting user is a rep", () => {});
  it.skip("Should not return customer information if requesting user is not authenticated", () => {});
  it.skip("Should return customer information if requesting user is the customer being requested", () => {});
});
