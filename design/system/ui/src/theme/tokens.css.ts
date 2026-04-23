import { createGlobalThemeContract } from "@vanilla-extract/css";
import { createSimpleBreakpointQueries } from "@justkits/design-foundations/breakpoints";
import { colorVariables } from "@justkits/design-foundations/colors";
import { elevationVariables } from "@justkits/design-foundations/elevation";
import { radiusVariables } from "@justkits/design-foundations/radius";
import { spacingVariables } from "@justkits/design-foundations/spacing";
import {
  textVariables,
  typographyVariables,
} from "@justkits/design-foundations/typography";

export { colorWithOpacity } from "@justkits/design-foundations/colors";

export const tokens = createGlobalThemeContract({
  colors: { ...colorVariables },
  elevation: { ...elevationVariables },
  font: { ...textVariables },
  typography: { ...typographyVariables },
  radius: { ...radiusVariables },
  spacing: { ...spacingVariables },
});

export const media = {
  breakpoints: createSimpleBreakpointQueries({
    sm: "768px",
    lg: "1280px",
  }),
  hoverable: "(hover: hover) and (pointer: fine)",
};
