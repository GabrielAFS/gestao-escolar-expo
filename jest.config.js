module.exports = {
  testEnvironment: "node",
  testMatch: ["**/src/tests/**/*.test.ts"],
  clearMocks: true,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
