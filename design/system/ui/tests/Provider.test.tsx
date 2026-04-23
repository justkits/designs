import { render } from "@testing-library/react";

import { UIProvider } from "@/Provider";

describe("Provider", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <UIProvider>
        <div>Test Child</div>
      </UIProvider>,
    );
    expect(getByText("Test Child")).toBeTruthy();
  });
});
