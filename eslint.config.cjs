// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

// Initialize compat object
const compat = new FlatCompat();

export default [
  js.configs.recommended,
  {
    files: ["frontend/*.js", "frontend/*.jsx"],
    ignores: ["node_modules/"],
    languageOptions: {
      globals: {
        window: true,
        document: true,
        console: true,
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
];
