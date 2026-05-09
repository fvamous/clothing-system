import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      /*
       * DEVELOPMENT MODE
       * Longgarkan dulu supaya fokus shipping
       */

      "@typescript-eslint/no-explicit-any": "off",

      "react-hooks/set-state-in-effect": "off",

      "@next/next/no-img-element": "off",

      /*
       * Tetap useful
       */

      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;