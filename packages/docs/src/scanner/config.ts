export interface JustkitsDocsConfig {
  /**
   * Contents Directory - where the MDX files are located
   * @default "contents/"
   */
  contentsDir?: string;
  /**
   * Output Directory - where the generated Manifest file will be placed
   * @default ".next/"
   */
  outputDir?: string;
  /**
   * Base URL - the base URL for all links in the generated sidebar (e.g. if your docs are served from "/docs", set this to "/docs")
   * @default "/"
   */
  baseUrl?: string;
}

export type ResolvedConfig = Required<JustkitsDocsConfig>;
