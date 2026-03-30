import { type DialogHTMLAttributes, type RefObject } from "react";

import { Portal } from "@/core/portal";
import { zIndices } from "@/core/zindex";
import { ContentContext, usePopover } from "./internals/contexts";

type PopoverContentProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "role" | "id" | "aria-labelledby" | "open" | "tabIndex"
>;

export function PopoverContent({
  children,
  className,
  style,
  "aria-label": ariaLabel = "Popover Content",
  ...rest
}: Readonly<PopoverContentProps>) {
  const {
    isOpen,
    isPortalMode,
    contentId,
    titleId,
    floatingStyles,
    floatingRef,
  } = usePopover();

  if (!isOpen) return null;

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <dialog
          style={{
            ...floatingStyles.container,
            zIndex: zIndices.popover,
            ...style,
          }}
          className={className}
          aria-label={ariaLabel}
          {...rest}
          id={contentId}
          aria-labelledby={titleId}
          open
          tabIndex={-1}
          ref={floatingRef as RefObject<HTMLDialogElement>}
        >
          {children}
        </dialog>
      </ContentContext.Provider>
    </Portal>
  );
}
