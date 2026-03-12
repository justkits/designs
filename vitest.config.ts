import path from "node:path";
import { defineConfig, type Plugin } from "vitest/config";

function packageSrcAlias(): Plugin {
  return {
    name: "package-src-alias",
    async resolveId(source, importer) {
      if (!source.startsWith("@/") || !importer) return null;
      const target = path.resolve(
        path.dirname(importer),
        "../src",
        source.slice(2),
      );
      return this.resolve(target, importer, { skipSelf: true });
    },
  };
}

export default defineConfig({
  plugins: [packageSrcAlias()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/tests/**/*.test.{ts,tsx}"],
    coverage: {
      include: ["**/src/**/*.{ts,tsx}"],
      exclude: ["**/tests/**/*", "**/src/main.tsx"],
      provider: "v8",
      reporter: [["text", { skipFull: true }], "clover", "lcov"],
    },
  },
});
