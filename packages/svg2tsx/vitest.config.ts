import { resolve } from "node:path";
import { defineProject, mergeConfig } from "vitest/config";

import { sharedConfig } from "@justkits/vitest-config/shared";

const config = defineProject({
  resolve: {
    alias: {
      "@lib": resolve(__dirname, "src/lib"),
      "@converter": resolve(__dirname, "src/converter"),
      "@cli": resolve(__dirname, "src/cli"),
      "@tests": resolve(__dirname, "tests"),
    },
  },
  test: {
    root: __dirname,
    environment: "node",
    setupFiles: ["tests/setup/vitest.setup.ts"],
  },
});

export default mergeConfig(sharedConfig, config);
