import { type CSSProperties } from "react";

import { type FloatingPlacement } from "@/core/placement/types";
import { zIndices } from "@/core/zindex";

function tooltip(x: number, y: number): CSSProperties {
  return {
    position: "fixed",
    top: y,
    left: x,
    zIndex: zIndices.tooltip,
  };
}

function arrow(
  placement: FloatingPlacement,
  shiftX: number,
  shiftY: number,
): CSSProperties {
  const commonStyles: CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "inherit",
  };

  if (placement === "top") {
    return {
      ...commonStyles,
      bottom: 0,
      left: "50%",
      marginBottom: -4,
      clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
      transform: `translateX(calc(-50% - ${shiftX}px)) translateY(${shiftY}px) rotate(45deg)`,
    };
  } else if (placement === "bottom") {
    return {
      ...commonStyles,
      top: 0,
      left: "50%",
      marginTop: -4,
      clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
      transform: `translateX(calc(-50% - ${shiftX}px)) translateY(${shiftY}px) rotate(45deg)`,
    };
  } else if (placement === "left") {
    return {
      ...commonStyles,
      right: 0,
      top: "50%",
      marginRight: -8,
      clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
      transform: `translateX(${shiftX}px) translateY(calc(-50% - ${shiftY}px))`,
    };
  } else {
    return {
      ...commonStyles,
      left: 0,
      top: "50%",
      marginLeft: -8,
      clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
      transform: `translateX(${shiftX}px) translateY(calc(-50% - ${shiftY}px)) rotate(180deg)`,
    };
  }
}

export const styles = { tooltip, arrow };
