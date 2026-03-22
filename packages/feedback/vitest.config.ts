import { resolve } from "node:path";
import { defineProject, mergeConfig } from "vitest/config";

import { sharedConfig } from "@justkits/vitest-config/shared";

const config = defineProject({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
  },
});

export default mergeConfig(sharedConfig, config);
