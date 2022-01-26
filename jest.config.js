module.exports = {
    collectCoverage: false,
    moduleFileExtensions: ["js", "json", "ts"],
    testEnvironment: "node",
    testMatch: ["**/*.ts"],
    transform: {
        "^.+\\.tsx?": "ts-jest"
    },
    roots: ["<rootDir>/tests"],
    rootDir: "./",
    verbose: false
};
