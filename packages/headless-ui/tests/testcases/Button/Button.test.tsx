import { render } from "@testing-library/react";

import { Button } from "@/Button";

describe("Button", () => {
  it("renders a button element by default", () => {
    const { getByTestId } = render(
      <Button data-testid="button">Click me</Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.getAttribute("type")).toBe("button");
  });

  it("handles state prop correctly", () => {
    const { getByTestId } = render(
      <Button data-testid="button" state="disabled">
        Click me
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.getAttribute("disabled")).toBe("");
    expect(button.getAttribute("aria-disabled")).toBe("true");
  });

  it("handles asChild prop correctly", () => {
    const { getByTestId } = render(
      <Button data-testid="button" asChild>
        <a href="test/">Click me</a>
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("A");
  });
});
