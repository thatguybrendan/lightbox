export default async () => {
  require("dotenv").config({ path: ["./.env.test", "./.env"] });

  /**
   * Prisma is a bit weird with how it likes to handle env variables. We must set the env variables in the CLI using dotenvx.
   * This is a workaround to make sure the env variables are set before running the tests.
   */
  require("child_process").execSync("yarn migration:test", {
    stdio: "inherit",
  });
};
