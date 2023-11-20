module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testRegex: "\\.spec\\.js$",
};
