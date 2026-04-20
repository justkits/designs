import { useLayoutEffect } from "react";

import type { SidebarItemProps, DocsNode } from "../types";
import { useInternalSidebar, useSidebar } from "./contexts";

type Props = {
  items: DocsNode[];
  SidebarItemComponent: React.ComponentType<SidebarItemProps>;
} & Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "id" | "role" | "aria-label"
>;

export function Sidebar({
  items,
  SidebarItemComponent,
  ...rest
}: Readonly<Props>) {
  const { isExpanded, contentId } = useSidebar();
  const { mountSidebar, unmountSidebar } = useInternalSidebar();

  useLayoutEffect(() => {
    mountSidebar();
    return () => {
      unmountSidebar();
    };
  }, [mountSidebar, unmountSidebar]);

  return (
    <nav
      {...rest}
      id={contentId}
      role="navigation"
      aria-label="Sidebar"
      data-expanded={isExpanded}
    >
      {items.map((item) => (
        <SidebarItemComponent
          key={item.type === "group" ? item.label : item.href}
          item={item}
        />
      ))}
    </nav>
  );
}
