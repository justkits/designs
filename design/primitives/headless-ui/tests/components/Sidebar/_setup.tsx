import { Sidebar, SidebarProps } from "@/components/Sidebar";

export function TestSidebar({ children, ...rest }: Readonly<SidebarProps>) {
  return (
    <Sidebar {...rest}>
      <Sidebar.Toggle>Toggle</Sidebar.Toggle>
      <Sidebar.Content data-testid="sidebar-content">
        <div>Sidebar Header</div>
        <Sidebar.Nav>{children}</Sidebar.Nav>
        <div>Sidebar Footer</div>
      </Sidebar.Content>
    </Sidebar>
  );
}
