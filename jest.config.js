export default {
  testEnvironment: "jsdom",
  coverageDirectory: "./coverage",
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
