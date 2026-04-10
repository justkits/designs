"use client";

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { InnerSidebarContext, SidebarContext } from "./context";

type SidebarProps = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Readonly<SidebarProps>) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const contentId = useId();

  const mountSidebar = useCallback(() => {
    if (isMounted.current) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Sidebar is already mounted. Only one Sidebar can be mounted at a time.",
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
    setIsExpanded((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      isMounted,
      isExpanded,
      toggleSidebar,
      contentId,
    }),
    [isMounted, isExpanded, toggleSidebar, contentId],
  );

  const innerContextValue = useMemo(
    () => ({
      mountSidebar,
      unmountSidebar,
    }),
    [mountSidebar, unmountSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <InnerSidebarContext.Provider value={innerContextValue}>
        {children}
      </InnerSidebarContext.Provider>
    </SidebarContext.Provider>
  );
}
