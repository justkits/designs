import type { FunctionComponent } from "react";

import { SidebarCloseIcon } from "./components/SidebarCloseIcon";
import { SidebarOpenIcon } from "./components/SidebarOpenIcon";
import type { IconProps } from "./types";

export type IconName = "sidebar-open" | "sidebar-close";

export const iconMap: Record<IconName, FunctionComponent<IconProps>> = {
  "sidebar-open": SidebarOpenIcon,
  "sidebar-close": SidebarCloseIcon,
};
