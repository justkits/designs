import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/ui/tokens.css";
import { colorWithOpacity, media } from "@justkits/ui/utils";

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../styles.css";

const header = style({
  display: "flex",
  alignItems: "center",
  gap: tokens.spacing.lg,
  height: HEADER_HEIGHT,
  backgroundColor: tokens.colors.surface,
  boxShadow: tokens.elevation.lv1,
});

const toggle = style({
  padding: tokens.spacing.sm,
  borderRadius: tokens.radius.sm,
  selectors: {
    "&[data-expanded='true']": {
      transform: "scaleX(-1)",
    },
  },
});

const left = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingLeft: tokens.spacing.layoutSmall,
  paddingRight: tokens.spacing.lg,
  gap: tokens.spacing.xl,
  width: `${SIDEBAR_WIDTH}px`,

  transition: "all 0.3s ease",

  selectors: {
    [`&:has(.${toggle}[data-expanded="true"])`]: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
    },
  },
});

const nav = style({
  flex: 1,
  display: "flex",
  justifyContent: "flex-start",
  padding: `0 ${tokens.spacing.layoutSmall}`,
  gap: tokens.spacing.xl,
});

const pageWrapper = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    height: HEADER_HEIGHT,
    fontWeight: tokens.typography.fontWeight.semibold,

    transition: "all 0.3s ease",
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        borderBottom: `2px solid ${tokens.colors.primary}`,
      },
    },
  },
});

const pageLink = recipe({
  base: {
    display: "inline-flex",
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    borderRadius: tokens.radius.sm,
    transition: "all 0.3s ease",
  },
  variants: {
    isActive: {
      true: {
        transform: "translateY(2px)",
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

const logo = style({
  color: tokens.colors.primary,
});

const right = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: tokens.spacing.md,
});

export const styles = {
  header,
  left,
  toggle,
  nav,
  pageWrapper,
  pageLink,
  logo,
  right,
};
