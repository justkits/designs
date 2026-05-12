import {
  SidebarContent,
  type SidebarContentProps,
} from "@justkits/headless-ui/Sidebar";
import clsx from "clsx";

import { styles } from "./styles.css";

interface SidebarProps extends SidebarContentProps {
  variant?: "default" | "icon";
}

export function Sidebar({
  children,
  variant = "default",
  className,
}: Readonly<SidebarProps>) {
  return (
    <SidebarContent className={clsx(styles.sidebar({ variant }), className)}>
      {children}
    </SidebarContent>
  );
}
