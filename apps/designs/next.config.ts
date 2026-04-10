import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "on" },
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withVanillaExtract(nextConfig);
