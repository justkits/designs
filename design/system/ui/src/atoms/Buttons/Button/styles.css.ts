import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { media, tokens } from "@/theme/tokens.css";

const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.radius.sm,
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
  },
  variants: {
    variant: {
      primary: {
        flex: 1,
        height: "36px",
        font: tokens.font.bodyLarge,
        backgroundColor: tokens.colors.primary,
        color: tokens.colors.onPrimary,
        selectors: {
          "&:disabled": {
            backgroundColor: tokens.colors.surface,
          },
        },
      },
      subtle: {
        flex: 1,
        height: "36px",
        font: tokens.font.bodyLarge,
        backgroundColor: tokens.colors.surface,
        color: tokens.colors.textMuted,
      },
      outline: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
        font: tokens.font.bodyMedium,
        backgroundColor: "transparent",
        color: tokens.colors.text,
        border: `1px solid ${tokens.colors.border}`,
        selectors: {
          "&:disabled": {
            border: `1px solid ${tokens.colors.borderMuted}`,
          },
        },
      },
      transparent: {
        padding: tokens.spacing.sm,
        font: tokens.font.bodyMedium,
        backgroundColor: "transparent",
        color: tokens.colors.primary,
      },
    },
  },
});

const spinner = style({
  width: "1rem",
  height: "1rem",
  margin: `0.125rem 0`,
  border: `2px solid ${tokens.colors.onPrimary}`,
  borderTopColor: "transparent",
  borderRadius: "50%",
});

export const styles = { button, spinner };
