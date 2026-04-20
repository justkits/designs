import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createJiti } from "jiti";

import { logger } from "@/lib/logger";
import { defaultConfig, type Svg2tsxConfig } from "./svg2tsx";
import {
  defaultSvgrConfig,
  type SettableSvgrConfig,
  type SvgrConfig,
} from "./svgr";

export type Config = Svg2tsxConfig & SettableSvgrConfig;

const DEFAULT_CONFIG_PATH = "svg2tsx.config.ts";

export class ConfigManager {
  private readonly configFilePath: string | null;

  public static config: Required<Svg2tsxConfig>; // NOSONAR
  public static svgrConfig: SvgrConfig; // NOSONAR

  constructor(configPath?: string) {
    this.configFilePath = this.validatePath(configPath);
  }

  private validatePath(path?: string): string | null {
    // 유저가 설정 파일을 지정했을 경우
    if (path) {
      const resolvedPath = resolve(process.cwd(), path);

      // 파일이 존재하지 않으면 오류
      if (!existsSync(resolvedPath)) {
        throw new Error(`Config file not found at path: ${resolvedPath}`);
      }

      // 파일이 존재하면 경로 반환
      return resolvedPath;
    }

    // 그렇지 않았을 경우, 기본 경로에 파일이 있다면, 그 경로를 반환하고, 없다면 null 반환
    const resolvedDefaultPath = resolve(process.cwd(), DEFAULT_CONFIG_PATH);

    if (existsSync(resolvedDefaultPath)) {
      return resolvedDefaultPath;
    } else {
      return null;
    }
  }

  public async loadConfig(): Promise<void> {
    if (this.configFilePath) {
      const userConfig = await this.readConfigFile(this.configFilePath);

      const {
        mode,
        facadeName,
        facadeSuffix,
        suffix,
        srcDir,
        outDir,
        ...svgrConfig
      } = userConfig;

      ConfigManager.config = {
        mode: mode ?? defaultConfig.mode,
        facadeName: facadeName ?? defaultConfig.facadeName,
        facadeSuffix: facadeSuffix ?? defaultConfig.facadeSuffix,
        suffix: suffix ?? defaultConfig.suffix,
        srcDir: srcDir ?? defaultConfig.srcDir,
        outDir: outDir ?? defaultConfig.outDir,
      };
      ConfigManager.svgrConfig = {
        ...defaultSvgrConfig,
        ...svgrConfig,
        svgoConfig: {
          ...defaultSvgrConfig.svgoConfig,
          ...svgrConfig.svgoConfig,
        },
      };
    } else {
      logger.info(`No config file... Processing with default config.`);

      ConfigManager.config = defaultConfig;
      ConfigManager.svgrConfig = defaultSvgrConfig;
    }
  }

  private async readConfigFile(path: string): Promise<Config> {
    const jiti = createJiti(import.meta.url);

    try {
      const result = await jiti.import(path, { default: true });

      return result as Config;
    } catch (error) {
      throw new Error(`Failed to load config from ${path}: ${error}`);
    }
  }
}

export function defineConfig(config: Config): Config {
  return config;
}
