import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
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
