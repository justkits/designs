import { render } from "@testing-library/react";

import { PrimitivesLayout } from "@app/primitives";
import { RootLayout } from "@app/root";
import { rootLayoutSetup } from "../_setup";

describe("PrimitivesLayout", () => {
  rootLayoutSetup();

  // Sidebar가 렌더링 되려면, RootLayout으로 감싸야한다.
  it("renders sidebar and contents (children) correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <PrimitivesLayout>
          <div>Component Content</div>
        </PrimitivesLayout>
      </RootLayout>,
    );

    // children도 제대로 렌더링되는지 확인
    expect(getByText("Component Content")).toBeTruthy();
  });
});
