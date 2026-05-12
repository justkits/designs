import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/tokens.css";
import { colorWithOpacity, media } from "@/utils";

const tab = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    whiteSpace: "nowrap",
  },
  variants: {
    active: {
      true: {
        borderBottom: `2px solid ${tokens.colors.primary}`,
      },
    },
  },
});

const link = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
    borderRadius: tokens.radius.md,
    color: "currentColor",
    backgroundColor: "transparent",
    transform: "translateY(2px)",
    transition: "all 0.3s ease",
    selectors: {
      "&:focus-visible": {
        outline: "none",
      },
    },
    "@media": {
      [media.hoverable]: {
        selectors: {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
  },
  variants: {
    active: {
      true: {
        color: tokens.colors.primary,

        "@media": {
          [media.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: tokens.colors.backgroundHover,
              },
            },
          },
        },
      },
      false: {
        "@media": {
          [media.hoverable]: {
            selectors: {
              "&:hover": {
                color: tokens.colors.primary,
                backgroundColor: colorWithOpacity(tokens.colors.primary, 15),
                transform: "translateY(0px)",
              },
            },
          },
        },
      },
    },
  },
});

const label = recipe({
  base: {
    fontSize: tokens.typography.fontSize.bodyMedium,
    fontWeight: tokens.typography.fontWeight.regular,
    lineHeight: tokens.typography.lineHeight.bodyMedium,
  },
  variants: {
    active: {
      true: {
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },
  },
});

export const styles = { tab, link, label };
