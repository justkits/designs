import { SidebarProvider } from "./Provider";
import { SidebarContent } from "./Content";
import { SidebarLink } from "./Link";
import { SidebarNav } from "./Nav";
import { SidebarToggle } from "./Toggle";

export const Sidebar = Object.assign(SidebarProvider, {
  Content: SidebarContent,
  Link: SidebarLink,
  Nav: SidebarNav,
  Toggle: SidebarToggle,
});

export { SidebarProvider, type SidebarProps } from "./Provider";
export { SidebarContent, type SidebarContentProps } from "./Content";
export { SidebarLink, type SidebarLinkProps } from "./Link";
export { SidebarNav, type SidebarNavProps } from "./Nav";
export { SidebarToggle, type SidebarToggleProps } from "./Toggle";
