import { defineConfig } from "eslint/config";
import { reactPackageEslintConfig } from "@justkits/eslint-config/react";

export default defineConfig([
  {
    extends: [reactPackageEslintConfig],
  },
]);
