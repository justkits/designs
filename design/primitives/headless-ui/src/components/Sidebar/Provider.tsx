import { useCallback, useId, useMemo } from "react";

import { useOpenState } from "@/core/disclosure";
import { SidebarContext } from "./_contexts";

export interface SidebarProps {
  children: React.ReactNode;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  scope?: "app" | "page";
}

export function SidebarProvider({
  children,
  isExpanded: controlledExpanded,
  onExpandedChange,
  scope = "app",
}: Readonly<SidebarProps>) {
  const {
    isOpen: isExpanded,
    show: expand,
    hide: collapse,
  } = useOpenState(controlledExpanded, onExpandedChange, false);
  const contentId = useId();

  const toggleSidebar = useCallback(() => {
    if (isExpanded) {
      collapse();
    } else {
      expand();
    }
  }, [isExpanded, expand, collapse]);

  const contextValue = useMemo(
    () => ({
      isExpanded,
      toggleSidebar,
      scope,
      contentId,
    }),
    [isExpanded, toggleSidebar, scope, contentId],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}
