import type { ColorTokens } from "@justkits/design-foundations/colors";
import type { ElevationTokens } from "@justkits/design-foundations/elevation";
import type {
  TextTokens,
  TypographyTokens,
} from "@justkits/design-foundations/typography";

// #region colors
const baseColors = {
  WHITE: {
    light: "#F9FAFB",
    medium: "#F5F5F9",
    dark: "#E3E5E8",
  },
  BLACK: {
    light: "#3F4146",
    medium: "#1F2125",
    dark: "#0A0A0A",
  },
  BLUE: {
    light: "#3B82F6",
    dark: "#1E40AF",
  },
  GOLD: "#A78C29",
  SILVER: "#888888",
  RED: "#B91C1C",
  YELLOW: "#EBB30B",
  GREEN: "#007200",
};

export const themeColors: ColorTokens = {
  primary: `light-dark(${baseColors.BLUE.dark}, ${baseColors.BLUE.light})`,
  primaryHover: `light-dark(${baseColors.BLUE.dark}CC, ${baseColors.BLUE.light}CC)`,
  onPrimary: baseColors.WHITE.light,
  secondary: baseColors.GOLD,
  secondaryHover: baseColors.SILVER,
  onSecondary: baseColors.BLACK.dark,
  success: baseColors.GREEN,
  warning: baseColors.YELLOW,
  error: baseColors.RED,
  info: baseColors.SILVER,
  background: `light-dark(${baseColors.WHITE.light}, ${baseColors.BLACK.dark})`,
  backgroundHover: `light-dark(${baseColors.SILVER}25, ${baseColors.SILVER}CC)`,
  surface: `light-dark(${baseColors.WHITE.medium}, ${baseColors.BLACK.medium})`,
  overlay: `light-dark(${baseColors.BLACK.medium}80, ${baseColors.SILVER}80)`,
  text: `light-dark(${baseColors.BLACK.dark}, ${baseColors.WHITE.light})`,
  textMuted: `light-dark(${baseColors.BLACK.light}, ${baseColors.WHITE.dark})`,
  textDisabled: `light-dark(${baseColors.SILVER}, ${baseColors.SILVER})`,
  border: `light-dark(${baseColors.BLACK.light}40, ${baseColors.WHITE.light}40)`,
  borderMuted: `${baseColors.SILVER}40`,
  borderInverted: `light-dark(${baseColors.WHITE.light}40, ${baseColors.BLACK.light}40)`,
};
// #endregion

// #region typography
export const themeTypography: TypographyTokens = {
  fontSize: {
    headingSmall: "1.5rem",
    headingMedium: "2rem",
    headingLarge: "2.5rem",
    bodySmall: "0.875rem",
    bodyMedium: "1rem",
    bodyLarge: "1.125rem",
  },
  lineHeight: {
    headingSmall: "1.8rem",
    headingMedium: "2.4rem",
    headingLarge: "2.7rem",
    bodySmall: "1.25rem",
    bodyMedium: "1.5rem",
    bodyLarge: "1.5rem",
  },
  fontWeight: {
    regular: "400",
    semibold: "500",
    bold: "700",
  },
  fontFamily: {
    brand: '"Kalam", "Kalam Fallback"',
    normal: '"Google Sans", system-ui',
    code: '"JetBrains Mono", monospace',
    quote: '"Roboto Slab", serif',
  },
};

export const themeTexts: TextTokens = {
  hero: `${themeTypography.fontWeight.bold} ${themeTypography.fontSize.headingLarge}/${themeTypography.lineHeight.headingLarge} ${themeTypography.fontFamily.brand}`,
  titleLarge: `${themeTypography.fontWeight.bold} ${themeTypography.fontSize.headingMedium}/${themeTypography.lineHeight.headingMedium} ${themeTypography.fontFamily.normal}`,
  titleMedium: `${themeTypography.fontWeight.bold} ${themeTypography.fontSize.headingSmall}/${themeTypography.lineHeight.headingSmall} ${themeTypography.fontFamily.normal}`,
  titleSmall: `${themeTypography.fontWeight.bold} ${themeTypography.fontSize.bodyLarge}/${themeTypography.lineHeight.bodyLarge} ${themeTypography.fontFamily.normal}`,
  bodyLarge: `${themeTypography.fontWeight.regular} ${themeTypography.fontSize.bodyLarge}/${themeTypography.lineHeight.bodyLarge} ${themeTypography.fontFamily.normal}`,
  bodyMedium: `${themeTypography.fontWeight.regular} ${themeTypography.fontSize.bodyMedium}/${themeTypography.lineHeight.bodyMedium} ${themeTypography.fontFamily.normal}`,
  bodySmall: `${themeTypography.fontWeight.regular} ${themeTypography.fontSize.bodySmall}/${themeTypography.lineHeight.bodySmall} ${themeTypography.fontFamily.normal}`,
  description: `${themeTypography.fontWeight.regular} ${themeTypography.fontSize.bodySmall}/${themeTypography.lineHeight.bodySmall} ${themeTypography.fontFamily.normal}`,
  code: `${themeTypography.fontWeight.regular} ${themeTypography.fontSize.bodySmall}/${themeTypography.lineHeight.bodySmall} ${themeTypography.fontFamily.code}`,
  quote: `${themeTypography.fontWeight.regular} ${themeTypography.fontSize.bodyLarge}/${themeTypography.lineHeight.bodyLarge} ${themeTypography.fontFamily.quote}`,
};
// #endregion

export const themeElevation: ElevationTokens = {
  lv1: "inset 1px -1px 0 0 rgba(127, 127, 127, 0.2)",
  lv2: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12)",
  lv3: "0px 3px 5px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)",
};
