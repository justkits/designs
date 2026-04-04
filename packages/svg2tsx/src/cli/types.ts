import { type Config } from "@svgr/core";

export type BuilderType = "family" | "standalone";

export type Platform = "web" | "native";

export interface SvgsConfig {
  /**
   * Type of builder to use.
   * - 'family': assets/[family]/[icon].svg -> src/[family]/[Icon].tsx
   * - 'standalone': assets/[icon].svg -> src/[Icon].tsx
   * @default 'standalone'
   */
  type?: BuilderType;

  /**
   * Target platform for the generated components.
   * - 'web': standard React (default)
   * - 'native': React Native via react-native-svg (sets SVGR native: true)
   * @default 'web'
   */
  platform?: Platform;

  /**
   * SVGR options
   */
  options?: Config;

  /**
   * Suffix to append to the component name
   * @default ""
   */
  suffix?: string;

  /**
   * Base directory for assets and src
   * @default process.cwd()
   */
  baseDir?: string;

  /**
   * Custom assets directory path (relative to baseDir or absolute)
   * @default "assets"
   */
  assetsDir?: string;

  /**
   * Custom src directory path (relative to baseDir or absolute)
   * @default "src"
   */
  srcDir?: string;

  /**
   * Whether to generate index.ts (barrel) files
   * @default false
   */
  index?: boolean;
}
