import { tokens } from "@/theme/tokens.css";
import { style } from "@vanilla-extract/css";

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
