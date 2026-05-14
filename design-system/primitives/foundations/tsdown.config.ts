import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/*/index.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
  },
  {
    entry: ["src/reset.css"],
    format: ["esm"],
    dts: false,
    clean: false,
    css: {
      splitting: true,
    },
  },
]);
