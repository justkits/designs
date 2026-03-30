import {
  type DialogHTMLAttributes,
  type RefObject,
  useId,
  useLayoutEffect,
} from "react";

import { Portal } from "@/core/portal";
import { zIndices } from "@/core/zindex";
import { ContentContext, usePopover } from "./internals/contexts";

type PopoverContentProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "role" | "id" | "aria-labelledby" | "aria-label" | "open" | "tabIndex"
>;

export function PopoverContent({
  children,
  className,
  style,
  ...rest
}: Readonly<PopoverContentProps>) {
  const {
    isOpen,
    isPortalMode,
    isPending,
    titleId,
    setContentId,
    floatingRef,
    containerStyles,
  } = usePopover();
  const id = useId();

  useLayoutEffect(() => {
    setContentId(id);
    return () => setContentId(undefined);
  }, [id, setContentId]);

  if (!isOpen) return null;

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <dialog
          style={{
            ...containerStyles,
            zIndex: zIndices.popover,
            ...style,
          }}
          className={className}
          {...rest}
          id={id}
          aria-label={titleId ? undefined : "Popover Content"}
          aria-labelledby={titleId}
          aria-busy={isPending}
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
