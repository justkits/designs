import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/queries.ts", "src/tokens.ts", "src/utils.ts", "src/reset.css"],
  format: ["esm"],
  css: {
    splitting: true,
  },
  dts: true,
  deps: {
    neverBundle: ["react"],
  },
});
