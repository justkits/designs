import { useId, useLayoutEffect, type HTMLAttributes } from "react";

import { AsChild } from "@/core/asChild";
import { Portal } from "@/core/portal";
import { MenuContext, useSelect } from "./internals/contexts";

type SelectMenuProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function SelectMenu({
  asChild = false,
  children,
  className,
  style,
  ...rest
}: SelectMenuProps) {
  const id = useId();
  const { isOpen, isPortalMode, setMenuId, containerStyles, floatingRef } =
    useSelect();

  useLayoutEffect(() => {
    setMenuId(id);
    return () => setMenuId(undefined);
  }, [id, setMenuId]);

  if (!isOpen) return null;

  if (asChild) {
    return (
      <Portal isPortalMode={isPortalMode}>
        <MenuContext.Provider value={true}>
          <AsChild
            {...rest}
            id={id}
            ref={floatingRef}
            role="listbox"
            className={className}
            style={{ ...containerStyles, ...style }}
          >
            {children}
          </AsChild>
        </MenuContext.Provider>
      </Portal>
    );
  }

  return (
    <Portal isPortalMode={isPortalMode}>
      <MenuContext.Provider value={true}>
        <div
          {...rest}
          id={id}
          ref={floatingRef}
          role="listbox"
          className={className}
          style={{ ...containerStyles, ...style }}
        >
          {children}
        </div>
      </MenuContext.Provider>
    </Portal>
  );
}
