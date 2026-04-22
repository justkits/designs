import { render } from "@testing-library/react";

import { Button } from "@/components/Button";

describe("Button", () => {
  it("renders a button element by default", () => {
    const { getByTestId } = render(
      <Button data-testid="button">Click me</Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.getAttribute("type")).toBe("button");
  });

  it("handles asChild prop correctly", () => {
    const buttonClick = vi.fn();
    const linkClick = vi.fn();

    const { getByTestId } = render(
      <Button
        data-testid="button"
        asChild
        className="button-class"
        onClick={buttonClick}
        style={{ color: "red" }}
      >
        <a
          href="test/"
          className="a-class"
          onClick={linkClick}
          style={{ textDecoration: "underline" }}
        >
          Click me
        </a>
      </Button>,
    );

    const button = getByTestId("button");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("A");

    // props가 제대로 전달되는지 확인
    expect(button.getAttribute("href")).toBe("test/");
    expect(button.className).toBe("button-class a-class");
    expect(button.style.color).toBe("red");
    expect(button.style.textDecoration).toBe("underline");

    // 이벤트 핸들러가 제대로 체이닝되는지 확인
    button.click();
    expect(linkClick).toHaveBeenCalledTimes(1);
    expect(buttonClick).toHaveBeenCalledTimes(1);
  });
});
