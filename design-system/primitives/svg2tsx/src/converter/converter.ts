import { relative, resolve } from "node:path";
import fg from "fast-glob";

import { ConfigManager } from "@/config/manager";
import { type IconMetadata } from "@/files/icon";
import { kebabToPascal } from "@/lib/format";
import { logger } from "@/lib/logger";
import { Family } from "./family";
import { Validator } from "./validator";

export class Converter {
  private dirType: "family" | "flat" = "flat";
  private svgFiles: string[];
  private loaded = false;
  private readonly families: Map<string, Family>;

  private readonly validator: Validator;

  constructor() {
    this.svgFiles = [];
    this.families = new Map();
    this.validator = new Validator();
  }

  public async scanAssets() {
    this.validateSrcDir();
    await this.loadSvgs();
    this.validateSvgFiles();
  }

  private async loadSvgs() {
    const svgFiles = await fg(`**/*.svg`, {
      cwd: resolve(ConfigManager.config.srcDir),
    });
    this.svgFiles = svgFiles;
    this.loaded = true;
  }

  private validateSrcDir() {
    const srcDir = ConfigManager.config.srcDir;
    const rel = relative(process.cwd(), srcDir);

    if (!rel || rel.startsWith("..")) {
      throw new Error(
        `Invalid srcDir: "${srcDir}". srcDir must be a subdirectory of the current working directory. Please specify a valid source directory within the project.`,
      );
    }
  }

  private validateSvgFiles() {
    // 디렉토리 구조 결정: 첫 번째 SVG 파일의 경로를 보고 family 구조인지 flat 구조인지 판단
    if (this.svgFiles.length === 0) {
      logger.error("No SVG files found in the source directory.");
      throw new Error("No SVG files found in the source directory.");
    }

    const hasFamily = this.svgFiles.some((f) => f.includes("/"));
    const hasFlat = this.svgFiles.some((f) => !f.includes("/"));

    if (hasFamily && hasFlat) {
      throw new Error(
        "Mixed directory structure detected: some SVG files are in subfolders (family) and some are not (flat). " +
          "Please organize all SVGs into subfolders or keep them all at the root level.",
      );
    }

    this.dirType = hasFamily ? "family" : "flat";
  }

  public async processIcons() {
    this.preProcess();

    // validation에서는 registry에서 중복체크를 하기 때문에, 병렬로 처리하지 않는다.
    for (const svgPath of this.svgFiles) {
      const icon = await this.getIconMetadata(svgPath);

      const familyName = this.dirType === "family" ? svgPath.split("/")[0] : "";
      this.addIconToFamily(icon, familyName);
    }

    await Promise.all(
      Array.from(this.families.values()).map((family) => family.prepare()),
    );
  }

  private preProcess() {
    if (!this.loaded) {
      throw new Error(
        "SVG files have not been loaded. Call scanAssets() first.",
      );
    }
  }

  private async getIconMetadata(svgPath: string): Promise<IconMetadata> {
    const { name, content } = await this.validator.validate(svgPath);

    const componentName = `${kebabToPascal(name)}${ConfigManager.config.suffix}`;
    const icon = {
      svgName: name,
      svgContent: content,
      componentName,
    };
    return icon;
  }

  private addIconToFamily(icon: IconMetadata, familyName: string) {
    let family = this.families.get(familyName);
    if (!family) {
      family = new Family(familyName);
      this.families.set(familyName, family);
    }
    family.addIcon(icon);
  }

  public async saveAll() {
    await Promise.all(
      Array.from(this.families.values()).map((family) => family.save()),
    );
  }

  public printSummary() {
    let totalIcons = 0;

    logger.info("Conversion Summary:");

    for (const family of this.families.values()) {
      const summary = family.getSummary();
      totalIcons += summary.iconCount;

      logger.info(
        `- Family: "${summary.familyName || "root"}", Icons: ${summary.iconCount}`,
      );
    }

    logger.info(`Total icons processed: ${totalIcons}`);
  }
}
