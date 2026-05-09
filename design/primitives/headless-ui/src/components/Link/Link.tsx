import { AsChild } from "@/core/asChild";
import type { LinkProps } from "./types";

export function Link({
  children,
  href,
  onClick: _onClick,
  external,
  active = false,
  disabled = false,
  asChild = false,
  ...rest
}: Readonly<LinkProps>) {
  const isExternal =
    href?.startsWith("http://") || href?.startsWith("https://");
  const isNewTab = external || (isExternal && external !== false);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    _onClick?.(event);
  };

  if (asChild) {
    return (
      <AsChild
        {...rest}
        href={href}
        onClick={onClick}
        disabled={disabled}
        target={isNewTab ? "_blank" : undefined}
        rel={isNewTab ? "noopener noreferrer" : undefined}
        aria-disabled={disabled || undefined}
        aria-current={active ? "page" : undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <a
      {...rest}
      href={href}
      onClick={onClick}
      target={isNewTab ? "_blank" : undefined}
      rel={isNewTab ? "noopener noreferrer" : undefined}
      aria-disabled={disabled || undefined}
      aria-current={active ? "page" : undefined}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </a>
  );
}
