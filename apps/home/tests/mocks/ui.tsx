vi.mock("@justkits/ui", () => ({
  UIProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useColorScheme: vi.fn().mockReturnValue({
    mode: "system",
    updateMode: vi.fn(),
  }),
}));
vi.mock("@justkits/ui/Badge", () => ({
  Badge: ({ label }: { label: string }) => <span>{label}</span>,
}));
vi.mock("@justkits/ui/Buttons", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  TabLink: ({ label, href }: { label: string; href: string }) => (
    <a href={href}>{label}</a>
  ),
}));
vi.mock("@justkits/ui/Collapsible", () => ({
  Collapsible: ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <>
      <span>{label}</span>
      {children}
    </>
  ),
}));
vi.mock("@justkits/ui/Icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}-icon</span>,
}));
vi.mock("@justkits/ui/Sidebar", () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => children,
  Sidebar: ({ children }: { children: React.ReactNode }) => (
    <aside>{children}</aside>
  ),
  SidebarNav: ({ children }: { children: React.ReactNode }) => (
    <nav>{children}</nav>
  ),
  SidebarLink: ({
    label,
    href,
    right,
  }: {
    label: string;
    href: string;
    right?: React.ReactNode;
  }) => (
    <a href={href}>
      {label}
      {right}
    </a>
  ),
  SidebarSection: ({
    label,
    children,
    right,
  }: {
    label: string;
    children: React.ReactNode;
    right?: React.ReactNode;
  }) => (
    <section>
      <h2>
        {label}
        {right}
      </h2>
      {children}
    </section>
  ),
  SidebarSectionLink: ({
    label,
    href,
    children,
  }: {
    label: string;
    href: string;
    children: React.ReactNode;
  }) => (
    <section>
      <h2>
        <a href={href}>{label}</a>
      </h2>
      {children}
    </section>
  ),
}));
vi.mock("@justkits/ui/Texts", () => ({
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));
