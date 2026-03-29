import { type CSSProperties } from "react";

import { zIndices } from "@/core/zindex";

const overlay: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: zIndices.overlay,
};

const alert: CSSProperties = {
  position: "relative",
  zIndex: zIndices.alert,
};

export const styles = { overlay, alert };
