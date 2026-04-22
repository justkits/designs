import { render } from "@testing-library/react";

import { AsChild } from "@/core/asChild";

describe("asChild corner cases", () => {
  const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  it("warns on console if no valid child is provided", () => {
    const { container } = render(<AsChild>Not a valid child</AsChild>);

    expect(container.firstChild).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[AsChild] asChild requires a single valid React element as child.",
    );
  });

  it("doesn't warn even if no valid child is provided in production", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const { container } = render(<AsChild>Not a valid child</AsChild>);

    expect(container.firstChild).toBeNull();
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
  });
});
