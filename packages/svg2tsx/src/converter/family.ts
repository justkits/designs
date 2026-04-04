import { basename, dirname, join, relative } from "node:path";
import { type Config } from "@svgr/core";

import { BaseSvgBuilder } from "./base";
import { logger } from "@lib/logger";

/**
 * SVG -> React 컴포넌트 변환용 빌더 (Family 분류를 포함)
 *
 * assets/[family]/[icon-name].svg 구조의 SVG 파일을
 * src/[family]/components/[ComponentName].tsx 형태로 변환.
 */
export class FamilySvgBuilder extends BaseSvgBuilder {
  private readonly exportMap: Record<string, string[]>; // key: familyName, value: componentNames[]

  /**
   * FamilySvgBuilder 초기화
   *
   * @param options - SVGR 변환 설정 객체
   * @param baseDir - 패키지 루트 디렉토리
   * @param suffix - 컴포넌트 이름 뒤에 붙일 접미사 (기본값: "")
   * @param generateIndex - index.ts 파일 생성 여부 (기본값: false)
   * @param assetsDir - 커스텀 assets 디렉토리 경로 (기본값: "assets")
   * @param srcDir - 커스텀 src 디렉토리 경로 (기본값: "src")
   */
  constructor(
    options: Config,
    baseDir: string,
    suffix: string = "",
    generateIndex: boolean = false,
    assetsDir: string = "assets",
    srcDir: string = "src",
    dryRun: boolean = false,
  ) {
    super(options, baseDir, suffix, generateIndex, assetsDir, srcDir, dryRun);
    this.exportMap = {};
  }

  protected printSummary(): void {
    const summaryData = Object.keys(this.exportMap)
      .sort((a, b) => a.localeCompare(b))
      .map((familyName) => ({
        Family: familyName,
        Count: this.exportMap[familyName].length,
        Status: "✅ OK",
      }));

    logger.detail("📊 Conversion Summary:");
    console.table(summaryData);
  }

  protected async generateBarrelFiles(): Promise<void> {
    const rootBarrelLines: string[] = [];
    const sortedFamilyNames = Object.keys(this.exportMap).sort((a, b) =>
      a.localeCompare(b),
    );

    for (const familyName of sortedFamilyNames) {
      const componentNames = this.exportMap[familyName];
      componentNames.sort((a, b) => a.localeCompare(b));
      const familyBarrelLines: string[] = [];

      for (const componentName of componentNames) {
        familyBarrelLines.push(
          `export { ${componentName} } from "./${componentName}";`,
        );
      }
      rootBarrelLines.push(
        `export { ${componentNames.join(", ")} } from "./${familyName}";`,
      );
      const familyBarrelContent = familyBarrelLines.join("\n") + "\n";

      const familyBarrelPath = join(this.SRC_DIR, familyName, "index.ts");
      await this.writeFile(familyBarrelPath, familyBarrelContent);
      this.trackGeneratedFile(familyBarrelPath);
    }

    const rootBarrelContent = rootBarrelLines.join("\n") + "\n";
    const rootBarrelPath = join(this.SRC_DIR, "index.ts");
    await this.writeFile(rootBarrelPath, rootBarrelContent);
    this.trackGeneratedFile(rootBarrelPath);
  }

  protected async saveComponentFile(
    content: string,
    componentName: string,
    file: string,
  ): Promise<void> {
    const familyName = relative(this.ASSETS_DIR, dirname(file));

    if (!familyName || familyName === ".") {
      throw new Error(
        `Icon "${basename(file)}" must be placed inside a category folder (e.g., assets/media/${basename(file)}).`,
      );
    }

    const componentPath = join(
      this.SRC_DIR,
      familyName,
      `${componentName}.tsx`,
    );
    await this.writeFile(componentPath, content);
    this.trackGeneratedFile(componentPath);

    if (!this.exportMap[familyName]) {
      this.exportMap[familyName] = [];
    }
    this.exportMap[familyName].push(componentName);
    if (this.dryRun) {
      logger.info(`[Dry Run] Would generate: ${familyName}/${componentName}`);
    } else {
      logger.info(`Generated: ${familyName}/${componentName}`);
    }
  }
}
