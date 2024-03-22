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

// export default {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   coverageDirectory: "./coverage",
//   collectCoverage: true,
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },

//   moduleNameMapper: {
//     "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
//     "^@/components/(.*)$": "<rootDir>/src/components/$1",
//     "^@/services/(.*)$": "<rootDir>/src/services/$1",
//     "^@/models/(.*)$": "<rootDir>/src/models/$1",
//     "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
//     "^@/context/(.*)$": "<rootDir>/src/context/$1",
//     "^@/assets/(.*)$": "<rootDir>/src/assets/$1",
//     "^@/constants/(.*)$": "<rootDir>/src/constants/$1",
//     "^@/api/(.*)$": "<rootDir>/src/api/$1",
//     "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
//     "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
//     "^@/locales/(.*)$": "<rootDir>/src/locales/$1",
//     "\\.(css|less|sass|scss)$": "identity-obj-proxy",
//     "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
//   },

//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
// };
