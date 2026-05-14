import type { BreakpointTokens } from "./types";

export const defaultBreakpoints: BreakpointTokens = {
  xs: "480px", // Mobile Portrait: 0px - 480px
  sm: "768px", // Mobile Landscape: 481px - 767px
  md: "1024px", // Tablet Portrait: 768px - 1023px
  lg: "1280px", // Tablet Landscape: 1024px - 1279px
  xl: "1440px", // Desktop: 1280px and above
};

export const breakpointVariables: BreakpointTokens = {
  xs: "breakpoint-xs",
  sm: "breakpoint-sm",
  md: "breakpoint-md",
  lg: "breakpoint-lg",
  xl: "breakpoint-xl",
};

export const breakpointCSSVariables: BreakpointTokens = {
  xs: `var(--${breakpointVariables.xs})`,
  sm: `var(--${breakpointVariables.sm})`,
  md: `var(--${breakpointVariables.md})`,
  lg: `var(--${breakpointVariables.lg})`,
  xl: `var(--${breakpointVariables.xl})`,
};
