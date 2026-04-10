"use client";

import Link from "next/link";
import { Button, Text } from "@justkits/headless-ui";

import { useSidebar } from "@entities/sidebar";
import { AppIcon, JustkitsDesignLogo } from "@shared/ui";
import { styles } from "./styles.css";

export function Header() {
  const { isMounted, isExpanded, toggleSidebar, contentId } = useSidebar();

  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        {isMounted.current && (
          <Button
            onClick={toggleSidebar}
            aria-controls={contentId}
            aria-expanded={isExpanded}
            data-testid="sidebar-toggle"
          >
            <AppIcon
              size={20}
              icon={isExpanded ? "sidebar-close" : "sidebar-open"}
              className={styles.sidebarIcon}
            />
          </Button>
        )}
        <Link href="/" className={styles.link} data-testid="home-link">
          <JustkitsDesignLogo height={24} />
          <Text variant="titleLarge" as="span" className={styles.logoText}>
            Justkits Designs
          </Text>
        </Link>
      </div>
      <nav
        className={styles.main}
        role="navigation"
        aria-label="Main Navigation"
      >
        <Link href="/components">Primitives</Link>
      </nav>
      <div className={styles.right}>
        <span>GithubLink</span>
        <span>BlogPageLink</span>
        <span>ThemeToggle</span>
      </div>
    </header>
  );
}
