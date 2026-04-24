import { colorWithOpacity } from "@justkits/design-foundations/colors";
import clsx from "clsx";

import { Text } from "@/atoms/Texts";
import { styles } from "./styles.css";

type Props = {
  label: string;
  color?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

/**
 * Badge component
 */
export function Badge({
  label,
  color = "gray",
  left,
  right,
  className,
}: Readonly<Props>) {
  return (
    <span
      className={clsx(styles.badge, className)}
      style={{ backgroundColor: colorWithOpacity(color, 25) }}
    >
      {left}
      <Text variant="description" style={{ color }}>
        {label}
      </Text>
      {right}
    </span>
  );
}
