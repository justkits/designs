import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactRefresh from "eslint-plugin-react-refresh";

import { reactPackageEslintConfig } from "./react";

export const nextEslintConfig = defineConfig([
  {
    extends: [reactPackageEslintConfig],
  },
  {
    files: ["**/src/**/*.{ts,tsx}"],
    extends: [reactRefresh.configs.next],
    rules: {
      "react-refresh/only-export-components": "error",
    },
  },
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
