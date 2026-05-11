import { useContext } from "react";

import { AsChild } from "@/core/asChild";
import { SidebarContext } from "./_contexts";

export interface SidebarToggleProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "type" | "onClick" | "aria-controls" | "aria-expanded"
> {
  children: React.ReactNode;
  asChild?: boolean;
  ctxErrMsg?: string;
}

export function SidebarToggle({
  children,
  asChild = false,
  ctxErrMsg = "Sidebar.Toggle must be used inside the Sidebar wrapper.",
  ...props
}: Readonly<SidebarToggleProps>) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const { isExpanded, toggleSidebar, contentId } = context;

  if (asChild) {
    return (
      <AsChild
        {...props}
        type="button"
        aria-controls={contentId}
        aria-expanded={isExpanded}
        onClick={toggleSidebar}
        data-expanded={isExpanded}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...props}
      type="button"
      aria-controls={contentId}
      aria-expanded={isExpanded}
      onClick={toggleSidebar}
      data-expanded={isExpanded}
    >
      {children}
    </button>
  );
}
