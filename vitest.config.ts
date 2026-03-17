import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["apps/*", "packages/*"],
    coverage: {
      include: ["packages/*/src/**/*.{ts,tsx}", "apps/*/src/**/*.{ts,tsx}"],
      exclude: [
        "packages/*/src/**/index.ts",
        "apps/*/src/**/index.ts",
        "tests/*",
      ],
      provider: "v8",
      reporter: [["text", { skipFull: true }], "clover", "lcov"],
    },
  },
});
