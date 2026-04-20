import { createContext, useContext } from "react";

type SidebarContextValue = {
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

type InternalContextValue = {
  mountSidebar: () => void;
  unmountSidebar: () => void;
};

export const InternalContext = createContext<InternalContextValue | null>(null);

export function useInternalSidebar() {
  const context = useContext(InternalContext);

  if (!context) {
    throw new Error("InternalSidebar must be used within a SidebarProvider.");
  }

  return context;
}
