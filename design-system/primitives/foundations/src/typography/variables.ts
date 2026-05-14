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
    headingSmall: "font-size-heading-sm",
    headingMedium: "font-size-heading-md",
    headingLarge: "font-size-heading-lg",
    bodySmall: "font-size-body-sm",
    bodyMedium: "font-size-body-md",
    bodyLarge: "font-size-body-lg",
  },
  lineHeight: {
    headingSmall: "line-height-heading-sm",
    headingMedium: "line-height-heading-md",
    headingLarge: "line-height-heading-lg",
    bodySmall: "line-height-body-sm",
    bodyMedium: "line-height-body-md",
    bodyLarge: "line-height-body-lg",
  },
  fontWeight: {
    regular: "font-weight-regular",
    semibold: "font-weight-semibold",
    bold: "font-weight-bold",
  },
  fontFamily: {
    brand: "font-family-brand",
    normal: "font-family-normal",
    code: "font-family-code",
    quote: "font-family-quote",
  },
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
    semibold: "var(--font-weight-semibold)",
    bold: "var(--font-weight-bold)",
  },
  fontFamily: {
    brand: "var(--font-family-brand)",
    normal: "var(--font-family-normal)",
    code: "var(--font-family-code)",
    quote: "var(--font-family-quote)",
  },
};
