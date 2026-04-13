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
});
