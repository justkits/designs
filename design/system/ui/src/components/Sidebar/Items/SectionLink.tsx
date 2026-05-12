import { useState } from "react";
import {
  CollapsibleContent,
  CollapsibleProvider,
  CollapsibleToggle,
} from "@justkits/headless-ui/Collapsible";

import { IconButton } from "@/atoms/Buttons";
import { SidebarLink, type SidebarLinkProps } from "./Link";
import { styles } from "./styles.css";

export interface SidebarSectionLinkProps extends Omit<
  SidebarLinkProps,
  "disabled" | "external"
> {
  toggleSide?: "left" | "right";
  children: React.ReactNode;
  subitemActive?: boolean;
}

export function SidebarSectionLink({
  label,
  href,
  left,
  right,
  toggleSide = "left",
  children, // = subitems
  active = false,
  subitemActive = false,
  ...rest
}: Readonly<SidebarSectionLinkProps>) {
  const [prevIsActive, setPrevIsActive] = useState<boolean>(active);
  const [isOpen, setIsOpen] = useState<boolean>(subitemActive || active);

  if (prevIsActive !== active) {
    setPrevIsActive(active);
    // 닫혀있는 경우 활성화되면 열기 (이미 열려있는 경우는 굳이 닫지 않음)
    if (!isOpen && active) {
      setIsOpen(true);
    }
  }

  return (
    <CollapsibleProvider isOpen={isOpen} onOpenChange={setIsOpen}>
      <SidebarLink
        {...rest}
        href={href}
        label={label}
        left={toggleSide === "left" ? <Toggle /> : left}
        right={toggleSide === "right" ? <Toggle /> : right}
        active={active}
      />
      <CollapsibleContent className={styles.items} role="group">
        {children}
      </CollapsibleContent>
    </CollapsibleProvider>
  );
}

function Toggle() {
  return (
    <CollapsibleToggle asChild>
      <IconButton
        icon="chevron-right"
        animateIcon="rotate90"
        className={styles.sectionLinkToggle}
      />
    </CollapsibleToggle>
  );
}
