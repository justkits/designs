import { CSSProperties } from "react";

import { PopoverPlacement } from "./main.context";
import { ZIndices } from "@/_zindex";

const wrapper: CSSProperties = {
  position: "relative",
  width: "fit-content",
};

function popover(
  placement: PopoverPlacement,
  shiftX: number,
  shiftY: number,
): CSSProperties {
  const commonStyles: CSSProperties = {
    position: "absolute",
    left: "50%",
    zIndex: ZIndices.popover,
  };

  if (placement === "top") {
    return {
      ...commonStyles,
      top: 0,
      transform: `translateX(calc(-50% + ${shiftX}px)) translateY(calc(-100% + ${shiftY}px))`,
    };
  } else {
    return {
      ...commonStyles,
      bottom: 0,
      transform: `translateX(calc(-50% + ${shiftX}px)) translateY(calc(100% + ${shiftY}px))`,
    };
  }
}

function arrow(
  placement: PopoverPlacement,
  shiftX: number,
  shiftY: number,
): CSSProperties {
  const commonStyles: CSSProperties = {
    position: "absolute",
    left: "50%",
    width: 8,
    height: 8,
    backgroundColor: "inherit",
    zIndex: ZIndices.popover,
  };

  if (placement === "top") {
    return {
      ...commonStyles,
      bottom: 0,
      marginBottom: -4,
      clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
      transform: `translateX(calc(-50% - ${shiftX}px)) translateY(${shiftY}px) rotate(45deg)`,
    };
  } else {
    return {
      ...commonStyles,
      top: 0,
      marginTop: -4,
      clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
      transform: `translateX(calc(-50% - ${shiftX}px)) translateY(${shiftY}px) rotate(45deg)`,
    };
  }
}

export const styles = { wrapper, popover, arrow };
