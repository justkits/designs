/// @vitest-environment jsdom
import { fireEvent, render, renderHook } from "@testing-library/react";

import {
  DocsGroup,
  DocsLeaf,
  Sidebar,
  SidebarProvider,
  SidebarToggle,
} from "@/sidebar";
import { useSidebar, useInternalSidebar } from "@/sidebar/contexts";

describe("Sidebar Integration", () => {
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  afterEach(() => {
    warnSpy.mockClear();
    vi.unstubAllEnvs();
  });

  it("renders sidebar items correctly", () => {
    const items = [
      {
        type: "leaf",
        label: "Home",
        href: "/home",
        order: 1,
        fields: {},
      } as DocsLeaf,
      {
        type: "group",
        label: "Docs",
        order: 2,
        children: [
          {
            type: "leaf",
            label: "Getting Started",
            href: "/docs/getting-started",
            order: 1,
            fields: {},
          } as DocsLeaf,
          {
            type: "leaf",
            label: "API Reference",
            href: "/docs/api",
            order: 2,
            fields: {},
          } as DocsLeaf,
        ],
      } as DocsGroup,
    ];

    const { getByTestId } = render(
      <SidebarProvider>
        <SidebarToggle data-testid="toggle">Toggle</SidebarToggle>
        <Sidebar
          items={items}
          SidebarItemComponent={({ item }) => <div>{item.label}</div>}
          data-testid="sidebar"
        />
      </SidebarProvider>,
    );

    const toggle = getByTestId("toggle");
    const sidebar = getByTestId("sidebar");

    // 초기에는 열려있어야 한다.
    expect(sidebar.dataset.expanded).toBe("true");

    fireEvent.click(toggle);

    expect(sidebar.dataset.expanded).toBe("false");
  });

  it("warns in console if multiple sidebars are mounted", () => {
    vi.stubEnv("NODE_ENV", "development");

    render(
      <SidebarProvider>
        <Sidebar items={[]} SidebarItemComponent={() => <div />} />
        <Sidebar items={[]} SidebarItemComponent={() => <div />} />
      </SidebarProvider>,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      "Multiple sidebars detected. Please ensure only one sidebar is mounted at a time.",
    );
  });

  it("warns in console if toggle is used without mounting sidebar", () => {
    vi.stubEnv("NODE_ENV", "development");

    const { getByTestId } = render(
      <SidebarProvider>
        <SidebarToggle data-testid="toggle">Toggle</SidebarToggle>
      </SidebarProvider>,
    );

    const toggle = getByTestId("toggle");
    fireEvent.click(toggle);

    expect(warnSpy).toHaveBeenCalledWith(
      "Sidebar is not mounted. Please mount the Sidebar before toggling.",
    );
  });

  describe("corner cases", () => {
    it("doesn't warn if multiple sidebars are mounted in production mode", () => {
      vi.stubEnv("NODE_ENV", "production");

      render(
        <SidebarProvider>
          <Sidebar items={[]} SidebarItemComponent={() => <div />} />
          <Sidebar items={[]} SidebarItemComponent={() => <div />} />
        </SidebarProvider>,
      );

      expect(warnSpy).not.toHaveBeenCalledWith(
        "Multiple sidebars detected. Please ensure only one sidebar is mounted at a time.",
      );
    });

    it("doesn't warn if toggle is used without mounting sidebar in production mode", () => {
      vi.stubEnv("NODE_ENV", "production");

      const { getByTestId } = render(
        <SidebarProvider>
          <SidebarToggle data-testid="toggle">Toggle</SidebarToggle>
        </SidebarProvider>,
      );

      const toggle = getByTestId("toggle");
      fireEvent.click(toggle);

      expect(warnSpy).not.toHaveBeenCalledWith(
        "Sidebar is not mounted. Please mount the Sidebar before toggling.",
      );
    });

    it("raises error if useSidebar is used outside of provider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => renderHook(() => useSidebar())).toThrow(
        "Sidebar must be used within a SidebarProvider.",
      );

      consoleErrorSpy.mockRestore();
    });

    it("raises error if useInternalSidebar is used outside of provider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => renderHook(() => useInternalSidebar())).toThrow(
        "InternalSidebar must be used within a SidebarProvider.",
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
