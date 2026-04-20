import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      sidebar: "src/sidebar/index.ts",
    },
    format: ["esm"],
    dts: true,
    clean: false,
    outputOptions: {
      banner: "'use client';",
      assetFileNames: "[name][extname]",
    },
  },
]);
