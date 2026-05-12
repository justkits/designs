import { useContext } from "react";

import { NavContext } from "./_contexts";

export interface SidebarLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "aria-disabled" | "aria-current"
> {
  children: React.ReactNode;
  as?: React.ElementType;
  left?: React.ReactNode;
  right?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  ctxErrMsg?: string;
}

export function SidebarLink({
  children,
  as: Component = "a",
  left,
  right,
  active = false,
  disabled = false,
  external = false,
  className,
  style,
  onClick,
  ctxErrMsg = "Sidebar.Link must be used inside Sidebar.Nav.",
  ...rest
}: Readonly<SidebarLinkProps>) {
  const isInsideNav = useContext(NavContext);

  if (!isInsideNav) {
    throw new Error(ctxErrMsg);
  }

  const isActive = active && !disabled;
  const doNothing = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
  };

  return (
    <div className={className} style={{ ...style, position: "relative" }}>
      {left}
      {children}
      {right}
      <Component
        {...rest}
        href={disabled ? undefined : rest.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? doNothing : onClick}
        style={{
          position: "absolute",
          inset: 0,
          padding: 0,
        }}
      />
    </div>
  );
}
