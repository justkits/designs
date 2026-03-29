import { type ReactNode, useId, useMemo, useRef, useState } from "react";

import { useFocusTrap } from "@/core/focus/useFocusTrap";
import { useOutsideInert } from "@/core/inert/useOutsideInert";
import { useBackgroundScrollLock } from "@/core/scroll-lock/useBackgroundScrollLock";
import { useOpenState } from "@/core/states/useOpenState";
import { AlertContext } from "./internals/contexts";

type AlertProps = {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  portal?: boolean;
};

export function Provider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  portal = false,
}: Readonly<AlertProps>) {
  const {
    isOpen,
    show: showAlert,
    hide: closeAlert,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const [isPending, setPending] = useState(false);

  const titleId = useId();
  const descriptionId = useId();
  const contentId = useId();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useBackgroundScrollLock(isOpen);
  useFocusTrap(wrapperRef, isOpen, triggerRef);
  useOutsideInert(wrapperRef, isOpen);

  const contextValue = useMemo(
    () => ({
      isOpen,
      showAlert,
      closeAlert,
      titleId,
      descriptionId,
      contentId,
      isPending,
      setPending,
      wrapperRef,
      triggerRef,
      isPortalMode: portal,
    }),
    [
      isOpen,
      showAlert,
      closeAlert,
      titleId,
      descriptionId,
      contentId,
      isPending,
      portal,
    ],
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
}
