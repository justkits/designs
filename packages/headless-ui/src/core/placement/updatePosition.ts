import { type FloatingPlacement } from "./types";

export function flipIfNeeded(
  triggerRect: DOMRect,
  elementRect: DOMRect,
  defaultPlacement: FloatingPlacement,
  offset: number,
): FloatingPlacement {
  if (defaultPlacement === "top") {
    const spaceAbove = triggerRect.top;
    const spaceNeeded = elementRect.height + offset;
    return spaceAbove < spaceNeeded ? "bottom" : "top";
  } else if (defaultPlacement === "bottom") {
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceNeeded = elementRect.height + offset;
    return spaceBelow < spaceNeeded ? "top" : "bottom";
  } else if (defaultPlacement === "left") {
    const spaceLeft = triggerRect.left;
    const spaceNeeded = elementRect.width + offset;
    return spaceLeft < spaceNeeded ? "right" : "left";
  } else {
    const spaceRight = window.innerWidth - triggerRect.right;
    const spaceNeeded = elementRect.width + offset;
    return spaceRight < spaceNeeded ? "left" : "right";
  }
}

export function computePosition(
  triggerRect: DOMRect,
  elementRect: DOMRect,
  placement: FloatingPlacement,
  offset: number,
): { x: number; y: number; shiftX: number; shiftY: number } {
  if (placement === "top" || placement === "bottom") {
    const naturalX =
      triggerRect.left + triggerRect.width / 2 - elementRect.width / 2;
    const y =
      placement === "top"
        ? triggerRect.top - elementRect.height - offset
        : triggerRect.bottom + offset;

    let shiftX = 0;
    if (naturalX < offset) {
      shiftX = offset - naturalX;
    } else if (naturalX + elementRect.width > window.innerWidth - offset) {
      shiftX = window.innerWidth - offset - elementRect.width - naturalX;
    }

    return { x: naturalX + shiftX, y, shiftX, shiftY: 0 };
  } else {
    const naturalY =
      triggerRect.top + triggerRect.height / 2 - elementRect.height / 2;
    const x =
      placement === "left"
        ? triggerRect.left - elementRect.width - offset
        : triggerRect.right + offset;

    let shiftY = 0;
    if (naturalY < offset) {
      shiftY = offset - naturalY;
    } else if (naturalY + elementRect.height > window.innerHeight - offset) {
      shiftY = window.innerHeight - offset - elementRect.height - naturalY;
    }

    return { x, y: naturalY + shiftY, shiftX: 0, shiftY };
  }
}
