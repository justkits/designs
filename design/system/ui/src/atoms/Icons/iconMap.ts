import type { ComponentType } from "react";
import type { IconProps } from "@justkits/svg2tsx";

import { CheckFill } from "./components/CheckFill";
import { ChevronDown } from "./components/ChevronDown";
import { ChevronRight } from "./components/ChevronRight";
import { ColorTheme } from "./components/ColorTheme";
import { ExternalLink } from "./components/ExternalLink";
import { SidebarArrow } from "./components/SidebarArrow";
import { Sidebar } from "./components/Sidebar";

export type IconName =
  | "check-fill"
  | "chevron-down"
  | "chevron-right"
  | "color-theme"
  | "external-link"
  | "sidebar-arrow"
  | "sidebar";

export const iconMap: Record<IconName, ComponentType<IconProps>> = {
  "check-fill": CheckFill,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "color-theme": ColorTheme,
  "external-link": ExternalLink,
  "sidebar-arrow": SidebarArrow,
  sidebar: Sidebar,
};
