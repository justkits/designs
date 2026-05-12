import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/ui/tokens.css";

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/shared/styles";

const container = style({
  flex: 1,
  display: "flex",
  flexDirection: "row",
});

const sidebar = style({
  height: `calc(100vh - ${HEADER_HEIGHT})`,
  selectors: {
    "&[data-state=expanded]": {
      width: SIDEBAR_WIDTH,
    },
  },
});

const main = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
});

export const styles = { container, main, sidebar };
