import { type ReactNode, useMemo, useRef, useState } from "react";

import { useClickOutside } from "@/core/clicks/useClickOutside";
import { useArrowNavigation } from "@/core/keyboard/useArrowNavigation";
import { useAutoFocus } from "@/core/keyboard/useAutoFocus";
import { useKeyboardEvent } from "@/core/keyboard/useKeyboardEvent";
import { useFloatingPosition } from "@/core/placement/useFloatingPosition";
import { useOpenState } from "@/core/states/useOpenState";
import { SelectContext } from "./internals/contexts";

export type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  portal?: boolean;
  offset?: number;
};

export function Provider({
  value,
  onValueChange,
  children,
  placeholder = "",
  portal = false,
  offset = 8,
}: Readonly<SelectProps>) {
  const {
    isOpen,
    show: showMenu,
    hide: closeMenu,
  } = useOpenState(undefined, undefined, false);
  const [triggerId, setTriggerId] = useState<string | undefined>(undefined);
  const [menuId, setMenuId] = useState<string | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  const { container } = useFloatingPosition(
    triggerRef,
    floatingRef,
    "bottom",
    isOpen,
    offset,
  );
  useClickOutside(floatingRef, closeMenu, isOpen, triggerRef);
  useKeyboardEvent("Escape", closeMenu, isOpen);
  useKeyboardEvent("Tab", closeMenu, isOpen);
  useAutoFocus(floatingRef, isOpen, triggerRef);
  useArrowNavigation(floatingRef, isOpen);

  const contextValue = useMemo(
    () => ({
      value,
      onValueChange,
      placeholder,
      isOpen,
      showMenu: () => showMenu(),
      closeMenu: () => closeMenu(),
      triggerId,
      setTriggerId,
      menuId,
      setMenuId,
      isPortalMode: portal,
      containerStyles: container,
      triggerRef,
      floatingRef,
    }),
    [
      value,
      onValueChange,
      placeholder,
      isOpen,
      showMenu,
      closeMenu,
      triggerId,
      menuId,
      portal,
      container,
    ],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
}
