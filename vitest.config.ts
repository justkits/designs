import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "apps/*",
      "design/primitives/*",
      "design/system/*",
      "packages/*",
    ],
    coverage: {
      exclude: [
        "**/index.ts",
        "**/cli.ts",
        "**/*.css.ts",
        "**/scanner/watch.ts",
        "**/*/tests/*",
        "**/dist/*",
        "**/node_modules/*",
      ],
      provider: "v8",
      reporter: [["text", { skipFull: true }]],
    },
  },
});
