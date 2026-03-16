import { render } from "@testing-library/react";

import { ThemeScript } from "@/theme";

describe("ThemeScript", () => {
  it("should render children correctly (default)", () => {
    const { container } = render(<ThemeScript />);
    expect(container).toBeTruthy();
  });
});
