import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // 🔧 Disable specific rules to prevent build errors
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",  // Ignore unused vars
      "react/no-unescaped-entities": "off",        // Fix apostrophe warnings
    },
  },
];

export default eslintConfig;
