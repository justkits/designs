import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@/tokens.css";

const sidebar = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    padding: `${tokens.spacing.md} ${tokens.spacing.sm}`,
    height: "100vh",
    backgroundColor: tokens.colors.surface,
    //borderRight: `1px solid ${tokens.colors.borderMuted}`,
    boxShadow: tokens.elevation.lv1,
    transition: "all 0.3s ease-in-out",

    selectors: {
      "&[data-state=expanded]": {
        width: "240px",
      },
    },
    // TODO: 디바이스별 사이드바 스타일 조정
  },
  variants: {
    variant: {
      default: {
        selectors: {
          "&[data-state=collapsed]": {
            width: 0,
          },
        },
      },
      icon: {
        selectors: {
          "&[data-state=collapsed]": {
            width: "64px",
          },
        },
      },
    },
  },
});

const nav = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.sm,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  scrollbarGutter: "auto",
  scrollbarWidth: "thin",
});

export const styles = { sidebar, nav };
