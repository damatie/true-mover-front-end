module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],

  overrides: [],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/prefer-optional-chain": "error",
    // disable the rule for all files
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
  },
  settings: {
    react: {
      version: "latest",
    },
  },
};
