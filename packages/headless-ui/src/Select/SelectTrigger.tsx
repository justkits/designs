import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  useContext,
  useId,
  useLayoutEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { MenuContext, TriggerContext, useSelect } from "./internals/contexts";

type SelectTriggerProps = {
  asChild?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">;

export function SelectTrigger({
  asChild = false,
  children,
  className,
  style,
  ...rest
}: SelectTriggerProps) {
  const id = useId();
  const { isOpen, showMenu, closeMenu, setTriggerId, menuId, triggerRef } =
    useSelect();

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      showMenu();
    }
  };

  useLayoutEffect(() => {
    setTriggerId(id);
    return () => setTriggerId(undefined);
  }, [id, setTriggerId]);

  const isInsideMenu = useContext(MenuContext);

  if (isInsideMenu && process.env.NODE_ENV !== "production") {
    console.warn(
      "Select.Trigger should not be used inside Select.Menu. Please move it outside of the menu component.",
    );
  }

  if (asChild) {
    return (
      <TriggerContext.Provider value={true}>
        <AsChild
          {...rest}
          id={id}
          ref={triggerRef}
          type="button"
          className={className}
          style={style}
          onClick={toggleMenu}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          {children}
        </AsChild>
      </TriggerContext.Provider>
    );
  }

  return (
    <TriggerContext.Provider value={true}>
      <button
        {...rest}
        id={id}
        ref={triggerRef}
        type="button"
        className={className}
        style={style}
        onClick={toggleMenu}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {children}
      </button>
    </TriggerContext.Provider>
  );
}

type SelectValueAsChildProps = {
  asChild: true;
} & HTMLAttributes<HTMLElement>;

type SelectValueDefaultProps = {
  asChild?: false;
} & HTMLAttributes<HTMLSpanElement>;

type SelectValueProps = SelectValueAsChildProps | SelectValueDefaultProps;

export function SelectValue({
  asChild = false,
  children,
  className,
  style,
  ...rest
}: SelectValueProps) {
  const { value, placeholder } = useSelect();

  const isInsideTrigger = useContext(TriggerContext);

  if (!isInsideTrigger) {
    throw new Error("Select.Value must be used within Select.Trigger");
  }

  if (asChild) {
    return (
      <AsChild {...rest} className={className} style={style}>
        {children}
      </AsChild>
    );
  }

  return (
    <span {...rest} className={className} style={style}>
      {value || placeholder}
    </span>
  );
}
