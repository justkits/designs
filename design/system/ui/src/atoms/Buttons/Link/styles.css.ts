import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { colorWithOpacity, media, tokens } from "@/theme/tokens.css";

const textLink = style({
  selectors: {
    "&:focus-visible": {
      outline: "none",
    },
  },
  "@media": {
    [media.hoverable]: {
      selectors: {
        "&:hover": {
          color: tokens.colors.primary,
          textDecoration: "underline",
          cursor: "pointer",
        },
      },
    },
  },
});

const tabLink = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    borderRadius: tokens.radius.md,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: "currentColor",
    backgroundColor: "transparent",
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
                transform: "translateY(-2px)",
                cursor: "pointer",
              },
            },
          },
        },
      },
    },
  },
});

const iconLink = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: tokens.spacing.sm,
  backgroundColor: "transparent",
  borderRadius: tokens.radius.md,
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
          backgroundColor: tokens.colors.backgroundHover,
          cursor: "pointer",
        },
      },
    },
  },
});

export const styles = { textLink, tabLink, iconLink };
