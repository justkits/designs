import type { TextTokens, TypographyTokens } from "./types";

export const textVariables: TextTokens = {
  hero: "font-hero",
  titleLarge: "font-title-large",
  titleMedium: "font-title-medium",
  titleSmall: "font-title-small",
  bodyLarge: "font-body-large",
  bodyMedium: "font-body-medium",
  bodySmall: "font-body-small",
  description: "font-description",
  code: "font-code",
  quote: "font-quote",
};

export const textCSSVariables: TextTokens = {
  hero: "var(--font-hero)",
  titleLarge: "var(--font-title-large)",
  titleMedium: "var(--font-title-medium)",
  titleSmall: "var(--font-title-small)",
  bodyLarge: "var(--font-body-large)",
  bodyMedium: "var(--font-body-medium)",
  bodySmall: "var(--font-body-small)",
  description: "var(--font-description)",
  code: "var(--font-code)",
  quote: "var(--font-quote)",
};

export const typographyVariables: TypographyTokens = {
  fontSize: {
    headingSmall: "16px",
    headingMedium: "20px",
    headingLarge: "24px",
    bodySmall: "14px",
    bodyMedium: "16px",
    bodyLarge: "18px",
  },
  lineHeight: {
    headingSmall: "24px",
    headingMedium: "28px",
    headingLarge: "32px",
    bodySmall: "20px",
    bodyMedium: "24px",
    bodyLarge: "28px",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  fontFamily: {},
};

export const typographyCSSVariables: TypographyTokens = {
  fontSize: {
    headingSmall: "var(--font-size-heading-sm)",
    headingMedium: "var(--font-size-heading-md)",
    headingLarge: "var(--font-size-heading-lg)",
    bodySmall: "var(--font-size-body-sm)",
    bodyMedium: "var(--font-size-body-md)",
    bodyLarge: "var(--font-size-body-lg)",
  },
  lineHeight: {
    headingSmall: "var(--line-height-heading-sm)",
    headingMedium: "var(--line-height-heading-md)",
    headingLarge: "var(--line-height-heading-lg)",
    bodySmall: "var(--line-height-body-sm)",
    bodyMedium: "var(--line-height-body-md)",
    bodyLarge: "var(--line-height-body-lg)",
  },
  fontWeight: {
    regular: "var(--font-weight-regular)",
    medium: "var(--font-weight-medium)",
    semibold: "var(--font-weight-semibold)",
    bold: "var(--font-weight-bold)",
  },
  fontFamily: {},
};
