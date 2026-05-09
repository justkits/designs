import {
  Link as HeadlessLink,
  type LinkProps as HeadlessProps,
} from "@justkits/headless-ui/Link";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export type LinkProps = HeadlessProps & {
  variant?: "text" | "icon" | "tab";
};

export function Link({
  children,
  variant = "text",
  className,
  active = false,
  ...rest
}: Readonly<LinkProps>) {
  return (
    <HeadlessLink
      {...rest}
      className={clsx(
        variant === "text" && styles.textLink,
        variant === "tab" && styles.tabLink({ active }),
        variant === "icon" && styles.iconLink,
        className,
      )}
    >
      {children}
    </HeadlessLink>
  );
}
