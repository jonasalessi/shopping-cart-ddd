const { defaults } = require('jest-config');
module.exports = {
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test))\\.(ts?)$",
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    collectCoverage: true,
    moduleDirectories: ['node_modules', 'src']
};