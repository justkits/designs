import { useContext } from "react";

import { ContentContext, NavContext } from "./_contexts";

export interface SidebarNavProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: React.ReactNode;
  ctxErrMsg?: string;
}

export function SidebarNav({
  children,
  "aria-label": ariaLabel = "Sidebar Navigation",
  ctxErrMsg = "Sidebar.Nav must be used inside Sidebar.Content.",
  ...rest
}: Readonly<SidebarNavProps>) {
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error(ctxErrMsg);
  }

  return (
    <NavContext.Provider value={true}>
      <nav {...rest} role="navigation" aria-label={ariaLabel}>
        {children}
      </nav>
    </NavContext.Provider>
  );
}
