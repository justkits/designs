import { type ReactNode, useId, useMemo, useRef } from "react";

import { useClickOutside } from "@/core/clicks/useClickOutside";
import { useKeyboardEvent } from "@/core/keyboard/useKeyboardEvent";
import { type FloatingPlacement } from "@/core/placement/types";
import { useFloatingPosition } from "@/core/placement/useFloatingPosition";
import { useOpenState } from "@/core/states/useOpenState";
import { useLongTouch } from "@/core/touch/useLongTouch";
import { TooltipContext } from "./internals/contexts";

type TooltipProps = {
  children: ReactNode;
  portal?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: FloatingPlacement;
  offset?: number;
  openDelay?: number;
  closeDelay?: number;
  longTouchDuration?: number;
  disabled?: boolean;
};

export function Provider({
  children,
  portal = false,
  isOpen: controlledOpen,
  onOpenChange,
  position = "bottom",
  offset = 16,
  openDelay = 300,
  closeDelay = 700,
  longTouchDuration = 500,
  disabled = false,
}: Readonly<TooltipProps>) {
  const {
    isOpen,
    show: showTooltip,
    hide: hideTooltip,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const tooltipId = useId();

  const { placement, x, y, shiftX, shiftY } = useFloatingPosition(
    triggerRef,
    floatingRef,
    position,
    isOpen,
    offset,
  );

  useClickOutside(floatingRef, hideTooltip, isOpen);
  useKeyboardEvent("Escape", hideTooltip, isOpen);
  useLongTouch(triggerRef, showTooltip, longTouchDuration, !isOpen); // 롱터치는 터치 자체에 delay가 있기 때문에, show에 delay를 주지 않는다.

  const contextValue = useMemo(
    () => ({
      disabled,
      isOpen,
      showTooltip,
      hideTooltip,
      isPortalMode: portal,
      tooltipId,
      openDelay,
      closeDelay,
      placement,
      x,
      y,
      shiftX,
      shiftY,
      triggerRef,
      floatingRef,
    }),
    [
      disabled,
      isOpen,
      showTooltip,
      hideTooltip,
      portal,
      tooltipId,
      openDelay,
      closeDelay,
      placement,
      x,
      y,
      shiftX,
      shiftY,
    ],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
}
