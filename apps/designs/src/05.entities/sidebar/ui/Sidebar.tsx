"use client";

import { useLayoutEffect } from "react";

import { useInnerSidebar, useSidebar } from "../models/context";
import { styles } from "./styles.css";

export function Sidebar() {
  const { isExpanded, contentId } = useSidebar();
  const { mountSidebar, unmountSidebar } = useInnerSidebar();

  useLayoutEffect(() => {
    mountSidebar();
    return () => {
      unmountSidebar();
    };
  }, [mountSidebar, unmountSidebar]);

  return (
    <div
      className={styles.sidebar({ isExpanded })}
      id={contentId}
      aria-label="Sidebar"
      data-testid="sidebar"
    >
      <nav
        className={styles.sidebarNav}
        role="navigation"
        aria-label="Sidebar Navigation"
        data-testid="sidebar-nav"
      >
        <h1>Sidebar {isExpanded ? "Expanded" : "Collapsed"}</h1>
        <p>This is the sidebar content.</p>
      </nav>
      <div className={styles.sidebarFooter}>
        <p>Sidebar Footer</p>
      </div>
    </div>
  );
}
