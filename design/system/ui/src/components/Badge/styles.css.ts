import { style } from "@vanilla-extract/css";

import { tokens } from "@/tokens.css";

const badge = style({
  display: "inline-block",
  alignItems: "center",
  justifyContent: "center",
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  gap: tokens.spacing.sm,
  borderRadius: tokens.radius.sm,
  font: tokens.font.description,
});

export const styles = { badge };
