"use client";

import { createContext, useContext, type RefObject } from "react";

type SidebarContextValue = {
  isMounted: RefObject<boolean>;
  isExpanded: boolean;
  toggleSidebar: () => void;
  contentId: string | undefined;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("Sidebar must be used within a SidebarProvider.");
  }

  return context;
}

type InnerContextValue = {
  mountSidebar: () => void;
  unmountSidebar: () => void;
};

export const InnerSidebarContext = createContext<InnerContextValue | null>(
  null,
);

export function useInnerSidebar() {
  const context = useContext(InnerSidebarContext);

  if (!context) {
    throw new Error("useInnerSidebar must be used within SidebarProvider.");
  }

  return context;
}
