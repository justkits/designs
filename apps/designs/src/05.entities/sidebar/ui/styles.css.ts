import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { tokens } from "@shared/lib/tokens.css";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../models/sizes";

const sidebar = recipe({
  base: {
    height: `calc(100vh - ${HEADER_HEIGHT})`,
    borderRight: `1px solid ${tokens.colors.borderMuted}`,
    boxShadow: tokens.elevation.lv1,
    transition: "width 0.3s ease",
  },
  variants: {
    isExpanded: {
      true: {
        width: SIDEBAR_WIDTH,
      },
      false: {
        width: "64px",
      },
    },
  },
});

const sidebarNav = style({
  flex: 1,
});

const sidebarFooter = style({});

export const styles = { sidebar, sidebarNav, sidebarFooter };
