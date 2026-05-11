import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/tokens.css";
import { media } from "@/utils";

const link = recipe({
  base: {
    selectors: {
      "&:focus-visible": {
        outline: "none",
      },
    },
  },
  variants: {
    variant: {
      text: {
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
      },
      icon: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: tokens.spacing.sm,
        backgroundColor: "transparent",
        borderRadius: tokens.radius.md,
        transition: "all 0.3s ease",
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
      },
    },
  },
});

export const styles = { link };
