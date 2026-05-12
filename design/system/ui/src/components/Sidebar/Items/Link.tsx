import {
  SidebarLink as SideLink,
  type SidebarLinkProps as SideLinkProps,
} from "@justkits/headless-ui/Sidebar";

import { AppIcon, type IconName } from "@/atoms/Icons";
import { Text } from "@/atoms/Texts";
import { styles } from "./styles.css";

export interface SidebarLinkProps extends Omit<
  SideLinkProps,
  "href" | "children"
> {
  label: string;
  href: string;
  indicator?: boolean;
  icon?: IconName;
}

export function SidebarLink({
  label,
  href,
  active = false,
  disabled = false,
  external = false,
  indicator = false,
  icon,
  left,
  right,
  ...rest
}: Readonly<SidebarLinkProps>) {
  const isActive = active && !disabled;
  const showIndicator = isActive && indicator;

  return (
    <SideLink
      {...rest}
      className={styles.link({ active: isActive, disabled })}
      href={href}
      active={active}
      disabled={disabled}
      external={external}
    >
      <Left left={left} icon={icon} />
      <Text
        variant="bodySmall"
        className={styles.linkLabel({ active: isActive, disabled })}
      >
        {label}
      </Text>
      <Right right={right} external={external} />
      {showIndicator && <span className={styles.indicator} />}
    </SideLink>
  );
}

function Left({
  left,
  icon,
}: Readonly<Pick<SidebarLinkProps, "left" | "icon">>) {
  if (left) return left;

  if (icon) {
    return <AppIcon icon={icon} />;
  }

  return null;
}

function Right({
  right,
  external,
}: Readonly<Pick<SidebarLinkProps, "right" | "external">>) {
  if (right) return right;

  if (external) {
    return <AppIcon icon="external-link" />;
  }

  return null;
}
