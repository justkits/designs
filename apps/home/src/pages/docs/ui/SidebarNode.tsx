"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { DocsNode, JustkitsDocsFrontmatter } from "@justkits/docs";
import { Badge } from "@justkits/ui/Badge";
import {
  SidebarLink,
  SidebarSectionLink,
  SidebarSection,
} from "@justkits/ui/Sidebar";

import { kebabToTitleCase } from "@/shared/lib/strings";

interface Props {
  item: DocsNode;
}

export function SidebarNode({ item }: Readonly<Props>) {
  const pathname = usePathname();

  if (item.type === "group") {
    return (
      <SidebarSection label={item.label}>
        {item.children.map((child) => (
          <SidebarNode key={child.href} item={child} />
        ))}
      </SidebarSection>
    );
  }

  const active = pathname === item.href;

  if (item.type === "branch") {
    const subitemActive = pathname?.startsWith(item.href);

    return (
      <SidebarSectionLink
        as={NextLink}
        label={item.label}
        href={item.href}
        active={active}
        subitemActive={subitemActive}
        right={<SidebarStatus status={item.fields.status} />}
      >
        {item.children.map((child) => (
          <SidebarNode key={child.href} item={child} />
        ))}
      </SidebarSectionLink>
    );
  }

  return (
    <SidebarLink
      as={NextLink}
      label={item.label}
      href={item.href}
      active={active}
      left={<div />}
      right={<SidebarStatus status={item.fields.status} />}
      indicator
    />
  );
}

function SidebarStatus({
  status,
}: Readonly<{
  status: JustkitsDocsFrontmatter["status"];
}>) {
  if (status === "coming-soon") {
    return <Badge color="#e18115" label={kebabToTitleCase(status)} />;
  }
  return null;
}
