import { ConfigManager } from "./config/manager";
import { Converter } from "./converter/converter";
import { clean } from "./lib/clean";
import { logger } from "./lib/logger";

export async function generate({
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
