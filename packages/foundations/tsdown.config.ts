import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/reset.css"],
  format: ["esm"],
  css: {
    inject: true,
    splitting: true,
  },
  outputOptions: {
    preserveModules: true,
  },
  deps: {
    neverBundle: ["react"],
  },
});
