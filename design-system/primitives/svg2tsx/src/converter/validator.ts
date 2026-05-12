import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { ConfigManager } from "@/config/manager";

export class Validator {
  private readonly nameRegistry: Map<string, string>; // iconName -> filePath
  private readonly contentRegistry: Map<string, string>; // contentHash -> filePath

  constructor() {
    this.nameRegistry = new Map();
    this.contentRegistry = new Map();
  }

  public async validate(
    relPath: string,
  ): Promise<{ name: string; content: string }> {
    this.validatePath(relPath);
    const name = this.validateName(relPath);
    const content = await this.readContent(relPath);
    const hash = this.validateContentHash(relPath, content);

    this.nameRegistry.set(name, relPath);
    this.contentRegistry.set(hash, relPath);

    return { name, content };
  }

  private validatePath(relPath: string): void {
    const slashCount = (relPath.match(/\//g) || []).length;

    if (slashCount > 1) {
      throw new Error(
        `Invalid file path: "${relPath}". ` +
          `Please move the file to the correct location.`,
      );
    }
  }

  private validateName(relPath: string): string {
    const name = basename(relPath, ".svg");

    // Icon names must be globally unique across all families. This ensures
    // no ambiguity when referencing icons by name (e.g., in iconMap types).
    const existingNameFile = this.nameRegistry.get(name);
    if (existingNameFile) {
      throw new Error(
        `Duplicate icon name "${name}" found in files:\n` +
          ` - ${existingNameFile}\n` +
          ` - ${relPath}\n` +
          `Please remove or rename one of the files to resolve the conflict.`,
      );
    }

    return name;
  }

  private validateContentHash(relPath: string, content: string): string {
    const hash = createHash("sha256").update(content).digest("hex");
    const existingContentFile = this.contentRegistry.get(hash);
    if (existingContentFile) {
      throw new Error(
        `Duplicate SVG content detected in files:\n` +
          ` - ${existingContentFile}\n` +
          ` - ${relPath}\n` +
          `Please remove or modify one of the files to resolve the conflict.`,
      );
    }
    return hash;
  }

  private async readContent(relPath: string): Promise<string> {
    const filePath = resolve(ConfigManager.config.srcDir, relPath);
    const content = await readFile(filePath, "utf-8");

    if (!content.trim()) {
      throw new Error(
        `Empty SVG content detected in file: "${filePath}". ` +
          `Please ensure the file contains valid SVG data.`,
      );
    }

    return content;
  }
}
