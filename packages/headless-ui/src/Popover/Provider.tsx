import { type ReactNode, useMemo, useRef, useState } from "react";

import { useClickOutside } from "@/core/clicks/useClickOutside";
import { useAutoFocus } from "@/core/keyboard/useAutoFocus";
import { useFocusTrap } from "@/core/keyboard/useFocusTrap";
import { useKeyboardEvent } from "@/core/keyboard/useKeyboardEvent";
import { type FloatingPlacement } from "@/core/placement/types";
import { useFloatingPosition } from "@/core/placement/useFloatingPosition";
import { useOpenState } from "@/core/states/useOpenState";
import { PopoverContext } from "./internals/contexts";

type PopoverProps = {
  children: ReactNode;
  portal?: boolean;
  position?: FloatingPlacement;
  offset?: number;
} & (
  | { isOpen: boolean; onOpenChange: (open: boolean) => void }
  | { isOpen?: never; onOpenChange?: never }
);

export function Provider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  portal = false,
  position = "bottom",
  offset = 16,
}: Readonly<PopoverProps>) {
  const {
    isOpen,
    show: showPopover,
    hide: hidePopover,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDialogElement | null>(null);
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const [contentId, setContentId] = useState<string | undefined>(undefined);
  const [isPending, setPending] = useState(false);

  useClickOutside(floatingRef, hidePopover, isOpen, triggerRef);
  useKeyboardEvent("Escape", hidePopover, isOpen);
  useAutoFocus(floatingRef, isOpen, triggerRef);
  useFocusTrap(floatingRef, isOpen);

  const { container, arrow } = useFloatingPosition(
    triggerRef,
    floatingRef,
    position,
    isOpen,
    offset,
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      showPopover: () => showPopover(),
      hidePopover: () => hidePopover(),
      isPending,
      setPending,
      isPortalMode: portal,
      titleId,
      setTitleId,
      contentId,
      setContentId,
      triggerRef,
      floatingRef,
      containerStyles: container,
      arrowStyles: arrow,
    }),
    [
      isOpen,
      showPopover,
      hidePopover,
      isPending,
      portal,
      titleId,
      setTitleId,
      contentId,
      setContentId,
      container,
      arrow,
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}
