import { join } from "node:path";

import { ConfigManager } from "@/config/manager";
import { FileToWrite } from "./base";
import { type IconMetadata } from "./icon";

export class IndexFile extends FileToWrite {
  constructor(familyName: string) {
    const outPath = join(ConfigManager.config.outDir, familyName, "index.ts");
    super(outPath);
  }

  public addIconExport(icon: IconMetadata) {
    this.addLine(
      `export { ${icon.componentName} } from "./components/${icon.componentName}";`,
    );
  }

  public addFacadeExport(componentName: string) {
    this.addLine(`export { ${componentName} } from "./${componentName}";`);
  }

  public prepare(): void {
    // index 파일은 content가 lines와 동일하다.
    this.content = this.lines.join("\n");
  }
}
