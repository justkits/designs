import { SidebarProvider } from "./Provider";
import { SidebarContent } from "./Content";
import { SidebarToggle } from "./Toggle";

export const Sidebar = Object.assign(SidebarProvider, {
  Content: SidebarContent,
  Toggle: SidebarToggle,
});

export { SidebarProvider, type SidebarProps } from "./Provider";
export { SidebarContent, type SidebarContentProps } from "./Content";
export { SidebarToggle, type SidebarToggleProps } from "./Toggle";
