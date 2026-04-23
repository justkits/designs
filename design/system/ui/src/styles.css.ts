import { createGlobalTheme } from "@vanilla-extract/css";
import { defaultRadius } from "@justkits/design-foundations/radius";
import { defaultSpacing } from "@justkits/design-foundations/spacing";

import { tokens } from "./theme/tokens.css";
import {
  themeColors,
  themeElevation,
  themeTexts,
  themeTypography,
} from "./theme/values";

createGlobalTheme(":root", tokens, {
  colors: { ...themeColors },
  elevation: { ...themeElevation },
  font: { ...themeTexts },
  typography: { ...themeTypography },
  radius: { ...defaultRadius },
  spacing: { ...defaultSpacing },
});
