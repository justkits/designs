import { type CSSProperties } from "react";

import { ZIndices } from "@/core/zindex";

const overlay: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: ZIndices.overlay,
};

const alert: CSSProperties = {
  position: "relative",
  zIndex: ZIndices.alert,
};

export const styles = { overlay, alert };
