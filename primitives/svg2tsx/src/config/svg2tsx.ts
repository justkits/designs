// svg2tsx 관련 설정 타입 정의
export type Svg2tsxConfig = {
  /**
   * index.ts 파일 생성 모드
   * @default "barrel"
   */
  mode?: "barrel" | "facade" | "both";

  /**
   * Facade 컴포넌트 이름 (Flat 구조)
   * @default "Icon"
   */
  facadeName?: string;

  /**
   * Facade 컴포넌트에 붙는 접미사 (Family 구조)
   * @default "Icon"
   */
  facadeSuffix?: string;

  /**
   * Suffix to append to the component name
   * @default ""
   */
  suffix?: string;

  /**
   * Custom source directory path (relative to cwd)
   * @default "assets"
   */
  srcDir?: string;

  /**
   * Custom output directory path (relative to cwd)
   * @default "src"
   */
  outDir?: string;
};

export const defaultConfig: Required<Svg2tsxConfig> = {
  // svg2tsx
  mode: "barrel",
  facadeName: "Icon",
  facadeSuffix: "Icon",
  suffix: "",
  srcDir: "assets",
  outDir: "src",
};
