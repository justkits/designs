import { AsChild } from "@/core/asChild";

export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "aria-disabled" | "aria-current"
> {
  asChild?: boolean;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
}

export function Link({
  children,
  href,
  onClick,
  external,
  active = false,
  disabled = false,
  asChild = false,
  ...rest
}: Readonly<LinkProps>) {
  const isExternal =
    href?.startsWith("http://") || href?.startsWith("https://");
  const isNewTab = external || (isExternal && external !== false);
  const Component = asChild ? AsChild : "a";

  const doNothing = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
  };

  return (
    <Component
      {...rest}
      href={disabled ? undefined : href}
      onClick={disabled ? doNothing : onClick}
      target={isNewTab ? "_blank" : undefined}
      rel={isNewTab ? "noopener noreferrer" : undefined}
      aria-disabled={disabled || undefined}
      aria-current={active ? "page" : undefined}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </Component>
  );
}
