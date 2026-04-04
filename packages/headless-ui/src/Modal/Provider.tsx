import { type ReactNode, useMemo, useRef, useState } from "react";

import { useClickOutside } from "@/core/clicks/useClickOutside";
import { useAutoFocus } from "@/core/keyboard/useAutoFocus";
import { useFocusTrap } from "@/core/keyboard/useFocusTrap";
import { useOutsideInert } from "@/core/inert/useOutsideInert";
import { useKeyboardEvent } from "@/core/keyboard/useKeyboardEvent";
import { useBackgroundScrollLock } from "@/core/scroll-lock/useBackgroundScrollLock";
import { useOpenState } from "@/core/states/useOpenState";
import { ModalContext } from "./internals/contexts";

type ModalProps = {
  children: ReactNode;
} & (
  | { isOpen: boolean; onOpenChange: (open: boolean) => void }
  | { isOpen?: never; onOpenChange?: never }
);

export function Provider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
}: ModalProps) {
  const {
    isOpen,
    show: openModal,
    hide: closeModal,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDialogElement | null>(null);
  const [isPending, setPending] = useState(false);
  const [titleId, setTitleId] = useState<string | undefined>(undefined);

  useClickOutside(floatingRef, closeModal, isOpen, triggerRef);
  useKeyboardEvent("Escape", closeModal, isOpen);
  useAutoFocus(floatingRef, isOpen, triggerRef);
  useFocusTrap(floatingRef, isOpen);
  useBackgroundScrollLock(isOpen);
  useOutsideInert(floatingRef, isOpen);

  const contextValue = useMemo(
    () => ({
      isOpen,
      openModal: () => openModal(),
      closeModal: () => closeModal(),
      isPending,
      setPending,
      titleId,
      setTitleId,
      triggerRef,
      floatingRef,
    }),
    [isOpen, openModal, closeModal, isPending, titleId],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
