import { type ButtonHTMLAttributes, type RefObject, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, usePopover } from "./internals/contexts";

type PopoverTriggerProps = {
  asChild?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-controls" | "aria-haspopup" | "aria-expanded" | "type" | "onClick"
>;

export function PopoverTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<PopoverTriggerProps>) {
  const { isOpen, showPopover, hidePopover, contentId, triggerRef } =
    usePopover();

  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "Popover.Trigger should be rendered outside of Popover.Content. Please move Popover.Trigger outside of Popover.Content to avoid unexpected behavior.",
    );
  }

  const handleClick = isOpen ? hidePopover : showPopover;

  if (asChild) {
    return (
      <AsChild
        {...rest}
        ref={triggerRef as RefObject<HTMLButtonElement>}
        aria-controls={contentId}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={handleClick}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...rest}
      ref={triggerRef as RefObject<HTMLButtonElement>}
      aria-controls={contentId}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
