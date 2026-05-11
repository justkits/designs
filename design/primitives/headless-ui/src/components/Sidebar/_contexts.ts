import { createContext } from "react";

type SidebarContextValue = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  scope: "app" | "page";
  contentId: string;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);
