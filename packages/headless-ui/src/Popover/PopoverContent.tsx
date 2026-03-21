import { HTMLAttributes } from "react";

import { usePopover } from "./internals/main.context";
import { PopoverContentContext } from "./internals/content.context";
import { styles } from "./internals/styles";

type PopoverContentProps = Omit<
  HTMLAttributes<HTMLDialogElement>,
  "open" | "tabIndex" | "id" | "ref"
>;

export function PopoverContent({
  children,
  style,
  className,
  "aria-label": ariaLabel = "Popover Content",
  ...rest
}: Readonly<PopoverContentProps>) {
  const { isOpen, placement, shiftX, shiftY, floatingRef, contentId } =
    usePopover();

  if (!isOpen) return null;

  return (
    <PopoverContentContext.Provider value={true}>
      <dialog
        ref={floatingRef}
        id={contentId}
        open
        tabIndex={-1}
        style={{ ...styles.popover(placement, shiftX, shiftY), ...style }}
        className={className}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </dialog>
    </PopoverContentContext.Provider>
  );
}
