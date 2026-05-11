import { Sidebar, SidebarProps } from "@/components/Sidebar";

export function TestSidebar({ children, ...rest }: Readonly<SidebarProps>) {
  return (
    <Sidebar {...rest}>
      <Sidebar.Toggle>Toggle</Sidebar.Toggle>
      <Sidebar.Content data-testid="sidebar-content">
        {children}
      </Sidebar.Content>
    </Sidebar>
  );
}
