module.exports = {
    env: {
        node: true,
        jest: true
    },
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.lint.json",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    rules: {
        "prettier/prettier": "error"
    },
    root: true
};
