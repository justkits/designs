import { fireEvent, render } from "@testing-library/react";

import { PrimitivesLayout } from "@app/primitives";
import { RootLayout } from "@app/root";
import { rootLayoutSetup } from "../_setup";

describe("PrimitivesLayout", () => {
  rootLayoutSetup();

  // Sidebar가 렌더링 되려면, RootLayout으로 감싸야한다.
  it("renders sidebar and contents (children) correctly", () => {
    const { getByTestId, getByText } = render(
      <RootLayout>
        <PrimitivesLayout>
          <div>Component Content</div>
        </PrimitivesLayout>
      </RootLayout>,
    );

    expect(getByTestId("sidebar-nav")).toBeTruthy(); // Sidebar

    // children도 제대로 렌더링되는지 확인
    expect(getByText("Component Content")).toBeTruthy();
  });

  it("handles sidebar toggle correctly", () => {
    const { getByTestId, getByText } = render(
      <RootLayout>
        <PrimitivesLayout>
          <div>Component Content</div>
        </PrimitivesLayout>
      </RootLayout>,
    );

    // 초기에는 Sidebar가 Expanded 상태여야 함
    expect(getByText("Sidebar Expanded")).toBeTruthy();

    fireEvent.click(getByTestId("sidebar-toggle")); // Sidebar 토글 버튼 클릭
    expect(getByText("Sidebar Collapsed")).toBeTruthy(); // Sidebar가 Collapsed 상태로 변경되어야 함

    fireEvent.click(getByTestId("sidebar-toggle")); // Sidebar 토글 버튼 클릭
    expect(getByText("Sidebar Expanded")).toBeTruthy(); // Sidebar가 다시 Expanded 상태로 변경되어야 함
  });
});
