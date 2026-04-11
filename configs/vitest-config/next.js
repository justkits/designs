import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export const nextConfig = defineConfig({
  plugins: [vanillaExtractPlugin()],
  server: {
    watch: null,
  },
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
