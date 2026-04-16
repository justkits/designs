import { join } from "node:path";

import { ConfigManager } from "@/config/manager";
import { FileToWrite } from "./base";
import { type IconMetadata } from "./icon";

export class IconMapFile extends FileToWrite {
  private readonly iconNameTypeLines: string[];
  private readonly iconMapRecordLines: string[];

  constructor(familyName: string) {
    const outPath = join(ConfigManager.config.outDir, familyName, "iconMap.ts");
    super(outPath);

    // 최상단에 일단 import를 넣어둔다.
    this.addLine(`import type { ComponentType } from "react";`);
    this.addLine(`import type { IconProps } from "@justkits/svg2tsx";`);
    this.addLine("");

    this.iconNameTypeLines = ["export type IconName ="];

    this.iconMapRecordLines = [
      "export const iconMap: Record<IconName, ComponentType<IconProps>> = {",
    ];
  }

  public addIconEntry(icon: IconMetadata) {
    // 최상단에 import
    this.addLine(
      `import { ${icon.componentName} } from "./components/${icon.componentName}";`,
    );

    // IconName 타입 라인 추가
    this.iconNameTypeLines.push(`  | "${icon.svgName}"`);

    // iconMap 레코드 라인 추가
    this.iconMapRecordLines.push(`  "${icon.svgName}": ${icon.componentName},`);
  }

  public prepare(): void {
    const fullContent = [
      ...this.lines,
      "",
      this.iconNameTypeLines.join("\n") + ";",
      "",
      this.iconMapRecordLines.join("\n") + "};",
    ];
    this.content = fullContent.join("\n");
  }
}
