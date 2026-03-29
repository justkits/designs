import { type ButtonHTMLAttributes, type RefObject, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useTooltip } from "./internals/contexts";

type TooltipTriggerProps = {
  asChild?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "type"
  | "aria-describedby"
  | "disabled"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
>;

export function TooltipTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const {
    disabled,
    showTooltip,
    hideTooltip,
    tooltipId,
    openDelay,
    closeDelay,
    triggerRef,
  } = useTooltip();

  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "Tooltip.Trigger should be rendered outside of Tooltip.Content. Please move Tooltip.Trigger outside of Tooltip.Content to avoid unexpected behavior.",
    );
  }

  if (asChild) {
    return (
      <AsChild
        {...rest}
        ref={triggerRef as RefObject<HTMLButtonElement>}
        aria-describedby={disabled ? undefined : tooltipId}
        disabled={disabled}
        onMouseEnter={() => showTooltip(openDelay)}
        onMouseLeave={() => hideTooltip(closeDelay)}
        onFocus={() => showTooltip(0)}
        onBlur={() => hideTooltip(0)}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      type="button"
      {...rest}
      ref={triggerRef as RefObject<HTMLButtonElement>}
      aria-describedby={disabled ? undefined : tooltipId}
      disabled={disabled}
      onMouseEnter={() => showTooltip(openDelay)}
      onMouseLeave={() => hideTooltip(closeDelay)}
      onFocus={() => showTooltip(0)}
      onBlur={() => hideTooltip(0)}
    >
      {children}
    </button>
  );
}
