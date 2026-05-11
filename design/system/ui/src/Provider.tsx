import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ColorTokens } from "@justkits/design-foundations/colors";
import { ColorSchemeProvider } from "@justkits/design-foundations/colors/scheme";
import { type ElevationTokens } from "@justkits/design-foundations/elevation";
import {
  defaultRadius,
  type RadiusTokens,
} from "@justkits/design-foundations/radius";
import {
  defaultSpacing,
  type SpacingTokens,
} from "@justkits/design-foundations/spacing";
import {
  type TextTokens,
  type TypographyTokens,
} from "@justkits/design-foundations/typography";

import { tokens } from "./tokens.css";
import "@justkits/design-foundations/color-scheme.css";
import "@justkits/design-foundations/reset.css";

// eslint-disable-next-line react-refresh/only-export-components
export { useColorScheme } from "@justkits/design-foundations/colors/scheme";

type Props = {
  children: React.ReactNode;
  colors?: ColorTokens;
  elevation?: ElevationTokens;
  font?: TextTokens;
  typography?: TypographyTokens;
  radius?: RadiusTokens;
  spacing?: SpacingTokens;
};

export function UIProvider({
  children,
  colors,
  elevation,
  font,
  typography,
  radius,
  spacing,
}: Readonly<Props>) {
  const defaultColors: ColorTokens = {
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
    backgroundHover: `${baseColors.SILVER}25`,
    surface: `light-dark(${baseColors.WHITE.medium}, ${baseColors.BLACK.medium})`,
    overlay: `light-dark(${baseColors.BLACK.medium}80, ${baseColors.SILVER}80)`,
    text: `light-dark(${baseColors.BLACK.dark}, ${baseColors.WHITE.light})`,
    textMuted: `light-dark(${baseColors.BLACK.light}, ${baseColors.WHITE.dark})`,
    textDisabled: `light-dark(${baseColors.SILVER}, ${baseColors.SILVER})`,
    border: `light-dark(${baseColors.BLACK.light}40, ${baseColors.WHITE.light}40)`,
    borderMuted: `${baseColors.SILVER}40`,
    borderInverted: `light-dark(${baseColors.WHITE.light}40, ${baseColors.BLACK.light}40)`,
  };

  const defaultTypography: TypographyTokens = {
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

  const defaultTexts: TextTokens = {
    hero: `${defaultTypography.fontWeight.bold} 3rem/3.6rem ${defaultTypography.fontFamily.brand}`,
    titleLarge: `${defaultTypography.fontWeight.bold} ${defaultTypography.fontSize.headingLarge}/${defaultTypography.lineHeight.headingLarge} ${defaultTypography.fontFamily.normal}`,
    titleMedium: `${defaultTypography.fontWeight.bold} ${defaultTypography.fontSize.headingMedium}/${defaultTypography.lineHeight.headingMedium} ${defaultTypography.fontFamily.normal}`,
    titleSmall: `${defaultTypography.fontWeight.bold} ${defaultTypography.fontSize.headingSmall}/${defaultTypography.lineHeight.headingSmall} ${defaultTypography.fontFamily.normal}`,
    bodyLarge: `${defaultTypography.fontWeight.regular} ${defaultTypography.fontSize.bodyLarge}/${defaultTypography.lineHeight.bodyLarge} ${defaultTypography.fontFamily.normal}`,
    bodyMedium: `${defaultTypography.fontWeight.regular} ${defaultTypography.fontSize.bodyMedium}/${defaultTypography.lineHeight.bodyMedium} ${defaultTypography.fontFamily.normal}`,
    bodySmall: `${defaultTypography.fontWeight.regular} ${defaultTypography.fontSize.bodySmall}/${defaultTypography.lineHeight.bodySmall} ${defaultTypography.fontFamily.normal}`,
    description: `${defaultTypography.fontWeight.regular} 0.75rem/1rem ${defaultTypography.fontFamily.normal}`,
    code: `${defaultTypography.fontWeight.regular} ${defaultTypography.fontSize.bodySmall}/${defaultTypography.lineHeight.bodySmall} ${defaultTypography.fontFamily.code}`,
    quote: `${defaultTypography.fontWeight.regular} ${defaultTypography.fontSize.bodyLarge}/${defaultTypography.lineHeight.bodyLarge} ${defaultTypography.fontFamily.quote}`,
  };

  const defaultElevation: ElevationTokens = {
    lv1: "inset 1px -1px 0 0 rgba(127, 127, 127, 0.2)",
    lv2: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12)",
    lv3: "0px 3px 5px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)",
  };

  const style = assignInlineVars(tokens, {
    colors: { ...defaultColors, ...colors },
    elevation: { ...defaultElevation, ...elevation },
    font: { ...defaultTexts, ...font },
    typography: { ...defaultTypography, ...typography },
    radius: { ...defaultRadius, ...radius },
    spacing: { ...defaultSpacing, ...spacing },
  });

  return (
    <ColorSchemeProvider>
      <div style={style}>{children}</div>
    </ColorSchemeProvider>
  );
}

const baseColors = {
  WHITE: {
    light: "#F9FAFB",
    medium: "#F5F5F9",
    dark: "#BEC0C2",
  },
  BLACK: {
    light: "#505053",
    medium: "#1F2125",
    dark: "#0A0A0A",
  },
  BLUE: {
    light: "#3B82F6",
    dark: "#1647e8",
  },
  GOLD: "#A78C29",
  SILVER: "#888888",
  RED: "#B91C1C",
  YELLOW: "#EBB30B",
  GREEN: "#007200",
};
