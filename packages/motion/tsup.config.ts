import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    keyframes: "src/keyframes.css",
  },
  format: ["esm"],
  dts: {
    entry: "src/index.ts",
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
