import { fireEvent, render } from "@testing-library/react";

import { Sidebar } from "@/components/Sidebar";
import { TestSidebar } from "./_setup";

describe("Sidebar - interactions", () => {
  it("should toggle the sidebar when the toggle button is clicked", () => {
    const { getByText, getByTestId } = render(
      <TestSidebar>
        <Sidebar.Link href="#">Home</Sidebar.Link>
      </TestSidebar>,
    );

    const toggleButton = getByText("Toggle");
    const content = getByTestId("sidebar-content");

    // 초기에는 사이드바가 열려 있어야 한다.
    expect(content.dataset.state).toBe("expanded");

    // 토글 버튼을 클릭하면 사이드바가 닫혀야 한다.
    fireEvent.click(toggleButton);
    expect(content.dataset.state).toBe("collapsed");

    // 다시 클릭하면 사이드바가 열려야 한다.
    fireEvent.click(toggleButton);
    expect(content.dataset.state).toBe("expanded");
  });

  it("should handle disabled link correctly", () => {
    const onClickMock = vi.fn();

    const { getByTestId } = render(
      <TestSidebar>
        <Sidebar.Link
          href="#"
          onClick={onClickMock}
          disabled
          data-testid="disabled-link"
        >
          Home
        </Sidebar.Link>
      </TestSidebar>,
    );

    const disabledLink = getByTestId("disabled-link");
    expect(disabledLink.getAttribute("aria-disabled")).toBe("true");
    expect(disabledLink.getAttribute("tabIndex")).toBe("-1");
    expect(disabledLink.getAttribute("href")).toBeNull();

    // 클릭 이벤트가 발생하지 않아야 한다.
    fireEvent.click(disabledLink);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("should handle active link correctly", () => {
    const onClickMock = vi.fn();
    const { getByTestId } = render(
      <TestSidebar>
        <Sidebar.Link
          href="#"
          onClick={onClickMock}
          active
          data-testid="active-link"
        >
          Home
        </Sidebar.Link>
      </TestSidebar>,
    );

    const activeLink = getByTestId("active-link");
    expect(activeLink.getAttribute("aria-current")).toBe("page");

    fireEvent.click(activeLink);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("should open external link in a new tab", () => {
    const { getByTestId } = render(
      <TestSidebar>
        <Sidebar.Link
          href="https://example.com"
          external
          data-testid="external-link"
        >
          External
        </Sidebar.Link>
      </TestSidebar>,
    );

    const externalLink = getByTestId("external-link");
    expect(externalLink.getAttribute("target")).toBe("_blank");
    expect(externalLink.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
