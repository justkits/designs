import {
  ReactNode,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { useClickOutside } from "@/_hooks/useClickOutside";
import { useFloatingPosition } from "@/_hooks/useFloatingPosition";
import { useFocusTrap } from "@/_hooks/useFocusTrap";
import { useKeyboardEvent } from "@/_hooks/useKeyboardEvent";
import { useOpenState } from "@/_hooks/useOpenState";
import { useTouchOutside } from "@/_hooks/useTouchOutside";
import {
  PopoverContext,
  type PopoverPlacement,
} from "./internals/main.context";
import { styles } from "./internals/styles";

type PopoverProps = {
  children: ReactNode;
} & (
  | { isOpen: boolean; onOpenChange: (open: boolean) => void }
  | { isOpen?: never; onOpenChange?: never }
);

export function Wrapper({
  children,
  isOpen: controlledOpen,
  onOpenChange,
}: Readonly<PopoverProps>) {
  const {
    isOpen,
    show: showPopover,
    hide: hidePopover,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDialogElement>(null);
  const contentId = useId();

  const { placement, shiftX, shiftY, updatePosition } = useFloatingPosition(
    triggerRef,
    floatingRef,
    "bottom",
    isOpen,
  );

  useLayoutEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  useClickOutside(wrapperRef, hidePopover, isOpen);
  useTouchOutside(wrapperRef, hidePopover, isOpen);
  useKeyboardEvent("Escape", hidePopover, isOpen);
  useFocusTrap(floatingRef, triggerRef, isOpen);

  const togglePopover = useCallback(() => {
    if (isOpen) {
      hidePopover();
    } else {
      showPopover();
    }
  }, [isOpen, showPopover, hidePopover]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      togglePopover,
      placement: placement as PopoverPlacement,
      shiftX,
      shiftY,
      triggerRef,
      floatingRef,
      contentId,
    }),
    [
      isOpen,
      togglePopover,
      placement,
      shiftX,
      shiftY,
      triggerRef,
      floatingRef,
      contentId,
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      <div ref={wrapperRef} style={styles.wrapper}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}
