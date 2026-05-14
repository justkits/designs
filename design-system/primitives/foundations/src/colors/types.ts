export interface ColorTokens {
  // Accent 1: Primary
  primary: string;
  primaryHover: string;
  onPrimary: string;
  // Accent 2: Secondary
  secondary: string;
  secondaryHover: string;
  onSecondary: string;
  // Alert colors
  error: string;
  warning: string;
  success: string;
  info: string;
  // Background colors
  background: string;
  backgroundHover: string;
  surface: string;
  overlay: string;
  // Text colors
  text: string;
  textMuted: string;
  textDisabled: string;
  // Border colors
  border: string;
  borderMuted: string;
  borderInverted: string;
}

// Color Scheme 관련 타입
/**
 * 사용자가 선택할 수 있는 컬러 모드 옵션
 */
export type ColorMode = "system" | "light" | "dark";
/**
 * 실제 적용되는 컬러 모드 (system이 아닌 light 또는 dark)
 */
export type ColorScheme = Exclude<ColorMode, "system">;
