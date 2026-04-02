import { render } from "@testing-library/react";

import { ThemeScript } from "@/theme/ThemeScript";

describe("ThemeScript", () => {
  it("should render children correctly (default)", () => {
    const { container } = render(<ThemeScript />);
    expect(container).toBeTruthy();
  });
});
