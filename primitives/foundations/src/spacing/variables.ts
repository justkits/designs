import type { SpacingTokens } from "./types";

export const defaultSpacing: SpacingTokens = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  layoutSmall: "24px",
  layoutMedium: "36px",
  layoutLarge: "48px",
};

export const spacingVariables: SpacingTokens = {
  xs: "spacing-xs",
  sm: "spacing-sm",
  md: "spacing-md",
  lg: "spacing-lg",
  xl: "spacing-xl",
  layoutSmall: "spacing-layouts-sm",
  layoutMedium: "spacing-layouts-md",
  layoutLarge: "spacing-layouts-lg",
};

export const spacingCSSVariables: SpacingTokens = {
  xs: `var(--spacing-xs)`,
  sm: `var(--spacing-sm)`,
  md: `var(--spacing-md)`,
  lg: `var(--spacing-lg)`,
  xl: `var(--spacing-xl)`,
  layoutSmall: `var(--spacing-layouts-sm)`,
  layoutMedium: `var(--spacing-layouts-md)`,
  layoutLarge: `var(--spacing-layouts-lg)`,
};
