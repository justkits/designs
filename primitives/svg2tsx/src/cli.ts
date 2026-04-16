#!/usr/bin/env node

declare const __PKG_VERSION__: string;

import { Command } from "commander";

import { ConfigManager } from "./config/manager";
import { Converter } from "./converter/converter";
import { clean } from "./lib/clean";
import { logger } from "./lib/logger";

const program = new Command();

program
  .name("svg2tsx")
  .description("JustKits SVG2TSX CLI to generate React components from SVGs")
  .version(__PKG_VERSION__)
  .option("-c, --config <path>", "path to config file")
  .option("--dry-run", "preview changes without writing any files")
  .action(() => generate(program.opts()));

program.parse();

async function generate({
  config: configPath,
  dryRun,
}: {
  config?: string;
  dryRun?: boolean;
}) {
  const startTime = performance.now();

  try {
    const configManager = new ConfigManager(configPath);
    await configManager.loadConfig();

    // 먼저, clean을 수행한다.
    if (!dryRun) {
      await clean(ConfigManager.config.outDir);
    }

    const converter = new Converter();

    await converter.scanAssets();
    await converter.processIcons();

    if (!dryRun) {
      await converter.saveAll();
    }

    converter.printSummary();

    const duration = ((performance.now() - startTime) / 1000).toFixed(2);
    if (dryRun) {
      logger.info(`🔍 [Dry Run] No files written. Completed in ${duration}s`);
    } else {
      logger.success(`✨ [Success] Generated components in ${duration}s`);
    }
  } catch (error) {
    logger.error("❌ Generation failed:");
    logger.error(String(error));
    process.exit(1);
  }
}
