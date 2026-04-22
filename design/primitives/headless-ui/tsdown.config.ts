import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/components/*/index.ts"],
  format: ["esm"],
  dts: true,
  clean: false,
  outputOptions: {
    banner: "'use client';",
  },
  deps: {
    neverBundle: ["react", "react-dom"],
  },
});
