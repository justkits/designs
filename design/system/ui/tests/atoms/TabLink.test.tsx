import { render } from "@testing-library/react";

import { TabLink } from "@/atoms/Buttons";

describe("TabLink", () => {
  it("renders the label correctly", () => {
    const { getByText } = render(<TabLink label="Home" href="/home" />);
    expect(getByText("Home")).toBeTruthy();
  });

  it("applies active styles when active prop is true", () => {
    const { getByTestId } = render(
      <TabLink label="Profile" href="/profile" active data-testid="tab-link" />,
    );
    const tabLink = getByTestId("tab-link");
    expect(tabLink.className).toContain("active");
  });
});
