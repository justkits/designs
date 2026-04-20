import { useCallback, useId, useMemo, useRef, useState } from "react";

import { InternalContext, SidebarContext } from "./contexts";

type SidebarProps = {
  children: React.ReactNode;
};

export function SidebarProvider({ children }: Readonly<SidebarProps>) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const isMounted = useRef<boolean>(false);
  const contentId = useId();

  const mountSidebar = useCallback(() => {
    if (isMounted.current) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Multiple sidebars detected. Please ensure only one sidebar is mounted at a time.",
        );
      }
      return;
    }
    isMounted.current = true;
    setIsExpanded(true);
  }, []);

  const unmountSidebar = useCallback(() => {
    isMounted.current = false;
    setIsExpanded(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (!isMounted.current) {
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
      isExpanded,
      toggleSidebar,
      contentId,
    }),
    [isExpanded, toggleSidebar, contentId],
  );

  const internalValue = useMemo(
    () => ({
      mountSidebar,
      unmountSidebar,
    }),
    [mountSidebar, unmountSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <InternalContext.Provider value={internalValue}>
        {children}
      </InternalContext.Provider>
    </SidebarContext.Provider>
  );
}
