module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "^@module/(.*)$": "<rootDir>/src/module/$1",
    "^@repository/(.*)$": "<rootDir>/src/repository/$1",
    "^@util/(.*)$": "<rootDir>/src/util/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@db/(.*)$": "<rootDir>/src/db/$1",
    "^@type/(.*)$": "<rootDir>/src/type/$1",
  },
};
