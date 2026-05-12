import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/ui/tokens.css";

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/shared/styles";

const header = style({
  display: "grid",
  gridTemplateColumns: `${SIDEBAR_WIDTH} 1fr auto`,
  alignItems: "center",
  gap: tokens.spacing.layoutLarge,
  height: HEADER_HEIGHT,
  backgroundColor: tokens.colors.surface,
  boxShadow: tokens.elevation.lv1,
  overflow: "hidden",
});

const headerPanel = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `0 ${tokens.spacing.layoutSmall}`,
  gap: tokens.spacing.md,
});

const tabs = style({
  flex: 1,
  display: "flex",
  justifyContent: "flex-start",
  padding: `0 ${tokens.spacing.layoutSmall}`,
  gap: tokens.spacing.xl,
  height: "100%",
});

const homeLink = style({
  padding: 0,
  borderRadius: tokens.radius.sm,
});

const justkits = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  padding: `0 ${tokens.spacing.md}`,
  gap: tokens.spacing.lg,
  color: tokens.colors.primary,
  whiteSpace: "nowrap",
});

const justkitsText = style({
  marginTop: tokens.spacing.sm,
  fontSize: tokens.typography.fontSize.headingMedium,
  lineHeight: tokens.typography.lineHeight.headingMedium,
});

export const styles = {
  header,
  headerPanel,
  tabs,
  homeLink,
  justkits,
  justkitsText,
};
