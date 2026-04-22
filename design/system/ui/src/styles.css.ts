import { createGlobalTheme } from "@vanilla-extract/css";
import {
  defaultRadius,
  defaultSpacing,
} from "@justkits/design-foundations/tokens";

import {
  themeColors,
  themeElevation,
  themeTexts,
  themeTypography,
} from "./theme/values";
import { tokens } from "./theme/tokens.css";
import "@justkits/design-foundations/vanilla-reset.css"; // reset CSS

createGlobalTheme(":root", tokens, {
  colors: { ...themeColors },
  elevation: { ...themeElevation },
  font: { ...themeTexts },
  typography: { ...themeTypography },
  radius: { ...defaultRadius },
  spacing: { ...defaultSpacing },
});
