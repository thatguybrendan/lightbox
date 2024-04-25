/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.(jest).{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test|jest).{js,jsx,ts,tsx}",
  ],
  globalSetup: "./src/utilities/jest/globalSetup.ts",
  globalTeardown: "./src/utilities/jest/globalTeardown.ts",
};
