import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/*/index.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
  },
  {
    entry: ["src/colors/scheme.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    banner: "'use client';",
    outDir: "dist/colors",
  },
  {
    entry: ["src/reset.css", "src/color-scheme.css"],
    format: ["esm"],
    dts: false,
    clean: false,
    css: {
      splitting: true,
    },
  },
]);
