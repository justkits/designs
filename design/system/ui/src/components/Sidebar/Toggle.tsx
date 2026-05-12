import { SidebarToggle as HeadlessToggle } from "@justkits/headless-ui/Sidebar";

import { IconButton, type IconButtonProps } from "@/atoms/Buttons";

interface SidebarToggleProps extends Omit<IconButtonProps, "icon"> {
  icon?: IconButtonProps["icon"];
}

export function SidebarToggle({
  icon = "sidebar-arrow",
  animateIcon = "flip",
  ...rest
}: Readonly<SidebarToggleProps>) {
  return (
    <HeadlessToggle asChild>
      <IconButton {...rest} icon={icon} animateIcon={animateIcon} />
    </HeadlessToggle>
  );
}
