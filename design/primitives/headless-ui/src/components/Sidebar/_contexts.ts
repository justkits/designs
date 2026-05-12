import { createContext } from "react";

type SidebarContextValue = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  scope: "app" | "page";
  contentId: string;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const ContentContext = createContext<boolean>(false);
export const NavContext = createContext<boolean>(false);
