import {
  Button as HeadlessButton,
  type ButtonProps,
} from "@justkits/headless-ui/Button";
import { clsx } from "clsx";

import { styles } from "./styles.css";

type Props = {
  variant?: "primary" | "subtle" | "outline" | "transparent";
} & ButtonProps;

export function Button({
  children,
  className,
  variant = "transparent",
  isLoading = false,
  ...rest
}: Readonly<Props>) {
  return (
    <HeadlessButton
      {...rest}
      className={clsx(styles.button({ variant }), className)}
    >
      {isLoading ? <div className={styles.spinner} /> : children}
    </HeadlessButton>
  );
}
