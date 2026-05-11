import {
  Link as HeadlessLink,
  type LinkProps as HeadlessProps,
} from "@justkits/headless-ui/Link";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export type LinkProps = HeadlessProps & {
  variant?: "text" | "icon";
};

export function Link({
  children,
  className,
  variant = "text",
  ...rest
}: Readonly<LinkProps>) {
  return (
    <HeadlessLink
      {...rest}
      className={clsx(styles.link({ variant }), className)}
    >
      {children}
    </HeadlessLink>
  );
}
