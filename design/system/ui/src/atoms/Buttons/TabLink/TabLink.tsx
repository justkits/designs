import { Link, type LinkProps } from "@justkits/headless-ui/Link";
import clsx from "clsx";

import { Text } from "@/atoms/Texts";
import { styles } from "./styles.css";

export interface TabLinkProps extends Omit<
  LinkProps,
  "href" | "children" | "asChild"
> {
  label: string;
  href: string;
}

export function TabLink({
  label,
  href,
  active = false,
  className,
  ...rest
}: Readonly<TabLinkProps>) {
  return (
    <div className={styles.tab({ active })}>
      <Link
        {...rest}
        href={href}
        active={active}
        className={clsx(styles.link({ active }), className)}
      >
        <Text variant="titleMedium" className={styles.label({ active })}>
          {label}
        </Text>
      </Link>
    </div>
  );
}
