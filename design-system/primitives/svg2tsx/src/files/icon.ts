import { join } from "node:path";
import { transform } from "@svgr/core";

import { ConfigManager } from "@/config/manager";
import { FileToWrite } from "./base";

export type IconMetadata = {
  svgName: string;
  svgContent: string;
  componentName: string;
};

export class IconFile extends FileToWrite {
  private readonly icon: IconMetadata;

  constructor(icon: IconMetadata, familyName: string) {
    const outPath = join(
      ConfigManager.config.outDir,
      familyName,
      "components",
      `${icon.componentName}.tsx`,
    );
    super(outPath);
    this.icon = icon;
  }

  public async prepare(): Promise<void> {
    this.content = await transform(
      this.icon.svgContent,
      ConfigManager.svgrConfig,
      {
        componentName: this.icon.componentName,
      },
    );
  }
}
