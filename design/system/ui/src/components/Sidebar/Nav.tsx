import {
  SidebarNav as Nav,
  type SidebarNavProps,
} from "@justkits/headless-ui/Sidebar";
import clsx from "clsx";

import { styles } from "./styles.css";

export function SidebarNav({
  children,
  className,
  ...rest
}: Readonly<SidebarNavProps>) {
  return (
    <Nav className={clsx(styles.nav, className)} {...rest}>
      {children}
    </Nav>
  );
}
