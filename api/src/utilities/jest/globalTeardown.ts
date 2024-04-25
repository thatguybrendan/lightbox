export default async () => {
  require("child_process").execSync("yarn migration:test:reset", {
    stdio: "inherit",
  });
};
