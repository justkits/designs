import { style } from "@vanilla-extract/css";

import { tokens } from "@/tokens.css";

const wrapper = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
});

const label = style({
  color: tokens.colors.textMuted,
  fontWeight: tokens.typography.fontWeight.semibold,
});

const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: tokens.radius.sm,
});

const icon = style({
  color: tokens.colors.textMuted,
  transition: "transform 0.3s ease",

  selectors: {
    [`${toggle}[data-state=open] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

export const styles = { wrapper, label, toggle, icon };
