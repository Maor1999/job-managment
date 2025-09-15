import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig({
  languageOptions: {
    globals: globals.node,
    sourceType: "module",
    ecmaVersion: "latest",
  },
  extends: [js.configs.recommended],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^next$" }],
  },
});
