module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "globals": {
    'ts-jest': {
      diagnostics: true
    }
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ], "moduleNameMapper": {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  "clearMocks": true,
  "collectCoverageFrom": ["src/**/*.{ts,tsx}"],
  "coverageDirectory": "coverage",
  "setupFiles": ["<rootDir>/setupTests.ts"],
};
