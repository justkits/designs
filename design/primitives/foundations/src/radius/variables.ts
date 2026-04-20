import type { RadiusTokens } from "./types";

export const defaultRadius: RadiusTokens = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "50%",
};

export const radiusVariables: RadiusTokens = {
  xs: "radius-xs",
  sm: "radius-sm",
  md: "radius-md",
  lg: "radius-lg",
  xl: "radius-xl",
  full: "radius-full",
};

export const radiusCSSVariables: RadiusTokens = {
  xs: `var(--radius-xs)`,
  sm: `var(--radius-sm)`,
  md: `var(--radius-md)`,
  lg: `var(--radius-lg)`,
  xl: `var(--radius-xl)`,
  full: `var(--radius-full)`,
};
