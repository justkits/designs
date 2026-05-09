import { createSimpleBreakpointQueries } from "@justkits/design-foundations/breakpoints";

export { colorWithOpacity } from "@justkits/design-foundations/colors";

export const media = {
  breakpoints: createSimpleBreakpointQueries({
    sm: "768px",
    lg: "1280px",
  }),
  hoverable: "(hover: hover) and (pointer: fine)",
};
