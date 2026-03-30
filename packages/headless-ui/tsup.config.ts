import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
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
  external: ["react", "react-dom"],
});
