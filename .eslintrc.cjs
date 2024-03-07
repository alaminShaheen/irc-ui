module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "prettier",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "@typescript-eslint", "react", "prettier"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        "import/resolver": {
            "typescript": {},
        },
    },
};
