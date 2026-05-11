import { fireEvent, render } from "@testing-library/react";

import { TestSidebar } from "./_setup";

describe("Sidebar - interactions", () => {
  it("should toggle the sidebar when the toggle button is clicked", () => {
    const { getByText, getByTestId } = render(
      <TestSidebar>
        <span>Sidebar Content</span>
      </TestSidebar>,
    );

    const toggleButton = getByText("Toggle");
    const content = getByTestId("sidebar-content");

    // 초기에는 사이드바가 닫혀 있어야 한다.
    expect(content.dataset.state).toBe("collapsed");

    // 토글 버튼을 클릭하면 사이드바가 열려야 한다.
    fireEvent.click(toggleButton);
    expect(content.dataset.state).toBe("expanded");

    // 다시 클릭하면 사이드바가 닫혀야 한다.
    fireEvent.click(toggleButton);
    expect(content.dataset.state).toBe("collapsed");
  });
});
