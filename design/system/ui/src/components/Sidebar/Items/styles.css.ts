import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/tokens.css";
import { colorWithOpacity, media } from "@/utils";

// #region link
const link = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    alignItems: "center",
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    gap: tokens.spacing.sm,
    height: "32px",
    borderRadius: tokens.radius.sm,

    transition: "background-color 0.3s ease",

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
        backgroundColor: colorWithOpacity(tokens.colors.primary, 15),

        "@media": {
          [media.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: colorWithOpacity(tokens.colors.primary, 25),
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
                backgroundColor: tokens.colors.backgroundHover,
              },
            },
          },
        },
      },
    },
    disabled: {
      true: {
        pointerEvents: "none",
        cursor: "not-allowed",
      },
    },
  },
});

const linkLabel = recipe({
  variants: {
    active: {
      true: {
        color: tokens.colors.primary,
        fontWeight: tokens.typography.fontWeight.bold,
      },
      false: {
        color: tokens.colors.text,
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },
    disabled: {
      true: {
        color: tokens.colors.textMuted,
      },
    },
  },
});

const indicator = style({
  width: "2px",
  position: "absolute",
  left: 0,
  top: "30%",
  bottom: "30%",
  backgroundColor: tokens.colors.primary,
});
// #endregion

const wrapper = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
});

const sectionLabel = style({
  color: tokens.colors.textMuted,
  fontWeight: tokens.typography.fontWeight.semibold,
});

const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: tokens.radius.sm,
  color: tokens.colors.textMuted,
});

const sectionLinkToggle = style([
  toggle,
  {
    position: "relative",
    zIndex: 1,
  },
]);

const items = style({
  display: "flex",
  flexDirection: "column",
  marginLeft: tokens.spacing.xl,
  gap: tokens.spacing.xs,
});

export const styles = {
  link,
  linkLabel,
  indicator,
  wrapper,
  sectionLabel,
  toggle,
  sectionLinkToggle,
  items,
};
