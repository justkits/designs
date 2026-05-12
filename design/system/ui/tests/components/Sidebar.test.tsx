import { render } from "@testing-library/react";

import { AppIcon } from "@/atoms/Icons";
import {
  Sidebar,
  SidebarLink,
  SidebarNav,
  SidebarProvider,
  SidebarSection,
  SidebarSectionLink,
  SidebarToggle,
} from "@/components/Sidebar";

describe("Sidebar", () => {
  it("renders the sidebar with all expected elements correctly", () => {
    render(
      <SidebarProvider>
        <SidebarToggle />
        <Sidebar>
          <SidebarNav>
            <SidebarLink
              label="External Link"
              href="https://external.com"
              icon="external-link"
              external
            />
            <SidebarSectionLink
              label="App"
              href="/"
              subitemActive
              right={<AppIcon icon="chevron-right" />}
            >
              <SidebarLink
                label="Home"
                href="/home"
                indicator
                active
                icon="check-fill"
              />
            </SidebarSectionLink>
            <SidebarSectionLink
              label="Section 1"
              href="/section1"
              toggleSide="right"
            >
              <SidebarLink label="subitem 1" href="/section1/subitem1" />
            </SidebarSectionLink>
            <SidebarSection label="Section 2">
              <SidebarLink label="Subitem A" href="/section2/subitemA" />
              <SidebarLink label="Subitem B" href="/section2/subitemB" />
            </SidebarSection>
          </SidebarNav>
        </Sidebar>
      </SidebarProvider>,
    );
  });

  it("handles sidebar section active state correctly", () => {
    const { getByTestId, rerender } = render(
      <SidebarProvider>
        <Sidebar>
          <SidebarNav>
            <SidebarSectionLink
              label="App"
              href="/"
              right={<AppIcon icon="chevron-right" />}
              data-testid="section-link"
            >
              <SidebarLink
                label="Home"
                href="/home"
                icon="check-fill"
                data-testid="subitem-link"
              />
            </SidebarSectionLink>
          </SidebarNav>
        </Sidebar>
      </SidebarProvider>,
    );

    // 초기 상태는 닫혀있는 상태
    const subitem = getByTestId("subitem-link");
    // subitem의 parent인 collapsible content의 state를 확인한다.
    expect(subitem.parentElement?.parentElement?.dataset.state).toBe("closed");

    // Rerender with section link active state change
    rerender(
      <SidebarProvider>
        <Sidebar>
          <SidebarNav>
            <SidebarSectionLink
              label="App"
              href="/"
              active
              indicator
              right={<AppIcon icon="chevron-right" />}
            >
              <SidebarLink label="Home" href="/home" icon="check-fill" />
            </SidebarSectionLink>
          </SidebarNav>
        </Sidebar>
      </SidebarProvider>,
    );

    // active 상태가 되면 열려야 한다
    // subitem의 parent인 collapsible content의 state가 open으로 변경되어야 한다.
    expect(subitem.parentElement?.parentElement?.dataset.state).toBe("open");

    // 다시 active 상태가 false로 변경된다고 해서, 닫히지는 않아야 한다.
    rerender(
      <SidebarProvider>
        <Sidebar>
          <SidebarNav>
            <SidebarSectionLink
              label="App"
              href="/"
              indicator
              right={<AppIcon icon="chevron-right" />}
            >
              <SidebarLink label="Home" href="/home" icon="check-fill" />
            </SidebarSectionLink>
          </SidebarNav>
        </Sidebar>
      </SidebarProvider>,
    );

    // subitem의 parent인 collapsible content의 state는 여전히 open이어야 한다.
    expect(subitem.parentElement?.parentElement?.dataset.state).toBe("open");
  });
});
