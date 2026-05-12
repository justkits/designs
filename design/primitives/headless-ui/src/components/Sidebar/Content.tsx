import { useContext } from "react";

import { ContentContext, SidebarContext } from "./_contexts";

export interface SidebarContentProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: React.ReactNode;
  ctxErrMsg?: string;
}

export function SidebarContent({
  children,
  ctxErrMsg = "Sidebar.Content must be used inside the Sidebar wrapper.",
  ...rest
}: Readonly<SidebarContentProps>) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const { isExpanded, scope, contentId } = context;
  const Component = scope === "app" ? "aside" : "div";

  return (
    <ContentContext.Provider value={true}>
      <Component
        {...rest}
        id={contentId}
        data-state={isExpanded ? "expanded" : "collapsed"}
      >
        {children}
      </Component>
    </ContentContext.Provider>
  );
}
