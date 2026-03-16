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
    exclude: [
      "src/tokens/typography/code.ts",
      "src/tokens/typography/quote.ts",
      "src/tokens/typography/text.ts",
    ],
  },
});

export default mergeConfig(sharedConfig, config);
