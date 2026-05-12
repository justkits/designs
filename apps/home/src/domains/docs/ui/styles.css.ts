import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/ui/tokens.css";
import { colorWithOpacity, media } from "@justkits/ui/utils";

// Anchor class applied to the branch toggle button so item's :has() can target it
const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: tokens.radius.sm,
  color: tokens.colors.textMuted,
  position: "relative",
  zIndex: 1,
});

const toggleIcon = style({
  transition: "transform 0.3s ease",

  selectors: {
    [`${toggle}[data-state="open"] &`]: {
      transform: "rotate(90deg)",
    },
  },
});

const subitems = style({
  display: "flex",
  flexDirection: "column",
  marginLeft: tokens.spacing.xl,
  gap: tokens.spacing.xs,
  transition: "all 0.3s ease",
});

const item = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "24px 1fr auto",
    alignItems: "center",
    padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
    gap: tokens.spacing.sm,
    height: 32,
    borderRadius: tokens.radius.sm,

    transition: "background-color 0.3s ease",

    "@media": {
      [media.hoverable]: {
        selectors: {
          "&:hover": {
            backgroundColor: tokens.colors.backgroundHover,
          },
          // :has(.toggleButton:hover) has specificity 0,2,0 vs :hover 0,1,0 — always wins
          [`&:has(${toggle}:hover)`]: {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
  variants: {
    isActive: {
      true: {
        color: tokens.colors.primary,
        backgroundColor: colorWithOpacity(tokens.colors.primary, 15),
        fontWeight: tokens.typography.fontWeight.bold,

        "@media": {
          [media.hoverable]: {
            selectors: {
              "&:hover": {
                backgroundColor: colorWithOpacity(tokens.colors.primary, 25),
              },
              // :has(.toggleButton:hover) has specificity 0,2,0 vs :hover 0,1,0 — always wins
              [`&:has(${toggle}:hover)`]: {
                backgroundColor: colorWithOpacity(tokens.colors.primary, 15),
              },
            },
          },
        },
      },
    },
  },
});

const itemLabel = style({
  fontWeight: tokens.typography.fontWeight.semibold,
});

const indicator = style({
  width: "2px",
  position: "absolute",
  left: 0,
  top: "30%",
  bottom: "30%",
  backgroundColor: "currentColor",
});

export const styles = {
  item,
  itemLabel,
  toggle,
  toggleIcon,
  subitems,
  indicator,
};
