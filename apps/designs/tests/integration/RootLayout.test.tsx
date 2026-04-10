import { render } from "@testing-library/react";

import { RootLayout } from "@app/root";
import { rootLayoutSetup } from "../_setup";

describe("RootLayout", () => {
  rootLayoutSetup();

  it("renders header, main and footer correctly", () => {
    const { getByRole, getByText } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    expect(getByRole("banner")).toBeTruthy(); // Header
    expect(getByRole("main")).toBeTruthy(); // Main content
    expect(getByRole("contentinfo")).toBeTruthy(); // Footer

    // children도 제대로 렌더링되는지 확인
    expect(getByText("Main Content")).toBeTruthy();
  });

  it("does not render sidebar if not given in children", () => {
    const { queryByTestId } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    expect(queryByTestId("sidebar")).toBeNull(); // Sidebar는 렌더링되지 않아야 함
  });

  it("handles logo click correctly (move to home)", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    expect(getByTestId("home-link").getAttribute("href")).toBe("/"); // 로고 클릭 시 홈으로 이동해야 함
  });

  it("handles link clicks correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Main Content</div>
      </RootLayout>,
    );

    expect(getByText("Primitives").getAttribute("href")).toBe("/primitives"); // Primitives 링크가 올바른 href를 가지고 있어야 함
  });
});
