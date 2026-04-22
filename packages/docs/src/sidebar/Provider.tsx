import { useCallback, useId, useMemo, useRef, useState } from "react";

import { InternalContext, SidebarContext } from "./contexts";

type SidebarProps = {
  children: React.ReactNode;
};

export function SidebarProvider({ children }: Readonly<SidebarProps>) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(false);
  const contentId = useId();

  const mountSidebar = useCallback(() => {
    if (isMountedRef.current) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Multiple sidebars detected. Please ensure only one sidebar is mounted at a time.",
        );
      }
      return;
    }
    isMountedRef.current = true;
    setIsMounted(true);
    setIsExpanded(true);
  }, []);

  const unmountSidebar = useCallback(() => {
    isMountedRef.current = false;
    setIsMounted(false);
    setIsExpanded(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (!isMountedRef.current) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Sidebar is not mounted. Please mount the Sidebar before toggling.",
        );
      }
      return;
    }

    setIsExpanded((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      isExpanded: isExpanded && isMounted,
      toggleSidebar,
      contentId,
    }),
    [isExpanded, isMounted, toggleSidebar, contentId],
  );

  const internalValue = useMemo(
    () => ({
      isMounted,
      mountSidebar,
      unmountSidebar,
    }),
    [isMounted, mountSidebar, unmountSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <InternalContext.Provider value={internalValue}>
        {children}
      </InternalContext.Provider>
    </SidebarContext.Provider>
  );
}
