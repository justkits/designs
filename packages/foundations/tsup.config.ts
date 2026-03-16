import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    reset: "src/reset.css",
  },
  format: ["esm"],
  dts: {
    resolve: true,
    compilerOptions: {
      incremental: false,
      composite: false,
    },
  },
  clean: true,
  shims: false,
  splitting: false,
  treeshake: true,
  minify: false,
  sourcemap: false,
  external: ["react"],
});
