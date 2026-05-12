import {
  Button as HeadlessButton,
  type ButtonProps,
} from "@justkits/headless-ui/Button";
import { clsx } from "clsx";

import { AppIcon, type IconName } from "@/atoms/Icons";
import { styles } from "./styles.css";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: IconName;
  size?: number;
  animateIcon?: "rotate90" | "rotate180" | "flip" | "spin" | "none";
}

export function IconButton({
  icon,
  size = 24,
  className,
  animateIcon = "none",
  ...rest
}: Readonly<IconButtonProps>) {
  return (
    <HeadlessButton {...rest} className={clsx(styles.iconButton, className)}>
      <AppIcon
        icon={icon}
        size={size}
        className={styles.icon({ animateIcon })}
      />
    </HeadlessButton>
  );
}
