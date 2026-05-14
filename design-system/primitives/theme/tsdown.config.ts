import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/*/index.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: "'use client';",
  },
  {
    entry: ["src/*/server.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
  },
  {
    entry: ["src/color-scheme.css"],
    format: ["esm"],
    dts: true,
    clean: false,
    css: {
      splitting: true,
    },
  },
]);
