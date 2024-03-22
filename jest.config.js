export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageDirectory: "./coverage",
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
