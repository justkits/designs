import { createGlobalThemeContract } from "@vanilla-extract/css";
import { colorVariables } from "@justkits/design-foundations/colors";
import { elevationVariables } from "@justkits/design-foundations/elevation";
import { radiusVariables } from "@justkits/design-foundations/radius";
import { spacingVariables } from "@justkits/design-foundations/spacing";
import {
  textVariables,
  typographyVariables,
} from "@justkits/design-foundations/typography";

export const tokens = createGlobalThemeContract({
  colors: { ...colorVariables },
  elevation: { ...elevationVariables },
  font: { ...textVariables },
  typography: { ...typographyVariables },
  radius: { ...radiusVariables },
  spacing: { ...spacingVariables },
});
