import { ButtonHTMLAttributes, RefObject } from "react";

import { usePopover } from "./internals/main.context";

type PopoverTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-haspopup" | "onClick"
>;

export function PopoverTrigger({
  children,
  ...rest
}: Readonly<PopoverTriggerProps>) {
  const { isOpen, togglePopover, triggerRef, contentId } = usePopover();

  return (
    <button
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={contentId}
      ref={triggerRef as RefObject<HTMLButtonElement>}
      type="button"
      onClick={togglePopover}
      {...rest}
    >
      {children}
    </button>
  );
}
