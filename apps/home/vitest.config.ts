import { defineProject, mergeConfig } from "vitest/config";
import { nextConfig } from "@justkits/vitest-config/next";

const appConfig = defineProject({
  test: {
    setupFiles: [
      "./tests/mocks/ui.tsx",
      "./tests/mocks/docs.ts",
      "./tests/mocks/rest.ts",
    ],
  },
});

export default mergeConfig(nextConfig, appConfig);
