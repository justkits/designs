import { style } from "@vanilla-extract/css";

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@entities/sidebar";
import { tokens } from "@shared/lib/tokens.css";

const header = style({
  display: "flex",
  alignItems: "center",
  padding: tokens.spacing.atoms.lg,
  gap: tokens.spacing.sections.lg,
  height: HEADER_HEIGHT,
  boxShadow: tokens.elevation.lv1,
});

const left = style({
  display: "flex",
  alignItems: "center",
  padding: `0 ${tokens.spacing.atoms.sm}`,
  gap: tokens.spacing.atoms.xl,
  width: SIDEBAR_WIDTH,
});

const sidebarIcon = style({
  color: tokens.colors.textMuted,
});

const link = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  color: tokens.colors.primary,
});

const logoText = style({
  marginTop: tokens.spacing.atoms.sm,
  fontFamily: "kalam",
  fontSize: "24px",
  fontWeight: "700",
});

const main = style({
  flex: 1,
  display: "flex",
  justifyContent: "flex-start",
  gap: tokens.spacing.atoms.lg,
});

const right = style({});

export const styles = {
  header,
  left,
  sidebarIcon,
  link,
  logoText,
  main,
  right,
};
