import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig([
  {
    entry: [
      "src/queries.ts",
      "src/tokens.ts",
      "src/utils.ts",
      "src/vanilla-reset.css.ts",
    ],
    format: ["esm"],
    dts: true,
    clean: false,
    deps: {
      neverBundle: ["@vanilla-extract/css"],
    },
  },
  {
    entry: ["src/vanilla-reset.css.ts"],
    plugins: [
      vanillaExtractPlugin(),
      {
        name: "css-only",
        generateBundle(_, bundle) {
          for (const key of Object.keys(bundle)) {
            if (bundle[key].type === "chunk") delete bundle[key];
          }
        },
      },
    ],
    format: ["esm"],
    dts: false,
    clean: false,
    outputOptions: {
      assetFileNames: "reset.css",
    },
  },
]);
