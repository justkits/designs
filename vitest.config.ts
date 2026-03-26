import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["apps/*", "packages/*"],
    coverage: {
      exclude: [
        "apps/*/src/**/index.ts",
        "apps/*/src/**/main.ts",
        "packages/*/src/**/index.ts",
        "packages/foundations/src/tokens/typography/code.ts",
        "packages/foundations/src/tokens/typography/quote.ts",
        "packages/foundations/src/tokens/typography/text.ts",
        "**/*/tests/*",
      ],
      provider: "v8",
      reporter: [["text", { skipFull: true }]],
    },
  },
});
