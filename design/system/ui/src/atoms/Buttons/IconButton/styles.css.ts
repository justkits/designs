import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/tokens.css";
import { media } from "@/utils";

const iconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: tokens.spacing.sm,

  font: tokens.font.bodyMedium,
  color: tokens.colors.primary,

  borderRadius: tokens.radius.sm,
  backgroundColor: "transparent",
  transition: "all 0.3s ease",

  selectors: {
    "&:disabled": {
      color: tokens.colors.textDisabled,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
  "@media": {
    [media.hoverable]: {
      selectors: {
        "&:not(:disabled):hover": {
          backgroundColor: tokens.colors.backgroundHover,
          cursor: "pointer",
        },
      },
    },
  },
});

const icon = recipe({
  base: {
    transition: "transform 0.3s ease",
  },
  variants: {
    animateIcon: {
      none: {},
      rotate90: {
        selectors: {
          [`${iconButton}[data-state=open] &`]: {
            transform: "rotate(90deg)",
          },
          [`${iconButton}[data-expanded=true] &`]: {
            transform: "rotate(90deg)",
          },
        },
      },
      rotate180: {
        selectors: {
          [`${iconButton}[data-state=open] &`]: {
            transform: "rotate(180deg)",
          },
          [`${iconButton}[data-expanded=true] &`]: {
            transform: "rotate(180deg)",
          },
        },
      },
      flip: {
        selectors: {
          [`${iconButton}[data-state=open] &`]: {
            transform: "scaleX(-1)",
          },
          [`${iconButton}[data-expanded=true] &`]: {
            transform: "scaleX(-1)",
          },
        },
      },
      spin: {
        selectors: {
          [`${iconButton}[data-state=open] &`]: {
            transform: "rotate(360deg)",
          },
          [`${iconButton}[data-expanded=true] &`]: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
});

export const styles = { iconButton, icon };
