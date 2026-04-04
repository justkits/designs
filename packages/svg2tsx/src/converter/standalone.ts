import { join } from "node:path";
import { type Config } from "@svgr/core";

import { BaseSvgBuilder } from "./base";
import { logger } from "@lib/logger";

/**
 * SVG -> React 컴포넌트 변환용 빌더 (Standalone 플랫 구조; Family 분류 없음)
 *
 * assets/[icon-name].svg 구조의 SVG 파일을
 * src/components/[ComponentName].tsx 형태로 변환합니다.
 */
export class StandaloneSvgBuilder extends BaseSvgBuilder {
  /**
   * StandaloneSvgBuilder 초기화
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
  }

  protected printSummary(): void {
    const summaryData = Array.from(this.nameRegistry.keys())
      .sort((a, b) => a.localeCompare(b))
      .map((componentName) => ({
        Component: componentName,
        Status: "✅ OK",
      }));

    logger.detail("📊 Conversion Summary:");
    console.table(summaryData);
  }

  protected async generateBarrelFiles(): Promise<void> {
    const barrelLines: string[] = [];
    const sortedComponentNames = Array.from(this.nameRegistry.keys()).sort(
      (a, b) => a.localeCompare(b),
    );

    for (const componentName of sortedComponentNames) {
      barrelLines.push(
        `export { ${componentName} } from "./${componentName}";`,
      );
    }

    const barrelContent = barrelLines.join("\n") + "\n";
    const barrelPath = join(this.SRC_DIR, "index.ts");
    await this.writeFile(barrelPath, barrelContent);
    this.trackGeneratedFile(barrelPath);
  }

  protected async saveComponentFile(
    content: string,
    componentName: string,
  ): Promise<void> {
    const componentPath = join(this.SRC_DIR, `${componentName}.tsx`);

    await this.writeFile(componentPath, content);
    this.trackGeneratedFile(componentPath);
    if (this.dryRun) {
      logger.info(`[Dry Run] Would generate: ${componentName}`);
    } else {
      logger.info(`Generated: ${componentName}`);
    }
  }
}
