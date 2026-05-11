import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: ["src/atoms/*/index.ts", "src/components/*/index.ts"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      onlyBundle: false,
    },
  },
  {
    entry: ["src/Provider.tsx"],
    plugins: [vanillaExtractPlugin()],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      onlyBundle: false,
    },
    banner: "'use client';\nimport './styles.css';",
    css: {
      fileName: "styles.css",
    },
  },
  {
    entry: ["src/tokens.css.ts", "src/utils.ts"],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      neverBundle: ["@vanilla-extract/css"],
    },
  },
]);
