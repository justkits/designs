import { fireEvent, render } from "@testing-library/react";

import { Link } from "@/components/Link";

describe("Link", () => {
  beforeAll(() => {
    // Not Implemented: navigation to another Document 경고 무시
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("renders an anchor element with the correct href", () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <Link href="/test" onClick={onClick}>
        Test Link
      </Link>,
    );

    const link = getByText("Test Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("/test");

    // 클릭 이벤트가 발생해야 한다.
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalled();
  });

  it("opens in a new tab when newtab prop is true", () => {
    const { getByText } = render(
      <Link href="https://example.com" external>
        External Link
      </Link>,
    );

    const link = getByText("External Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("opens in a new tab for external links even when newtab prop is not set", () => {
    const { getByText } = render(
      <Link href="https://example.com">External Link</Link>,
    );

    const link = getByText("External Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("does not open in a new tab when newtab prop is false even for external links", () => {
    const { getByText } = render(
      <Link href="https://example.com" external={false}>
        External Link
      </Link>,
    );

    const link = getByText("External Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("target")).toBeNull();
    expect(link.getAttribute("rel")).toBeNull();
  });

  it("handles active state correctly", () => {
    const { getByText } = render(
      <Link href="/test" active>
        Active Link
      </Link>,
    );

    const link = getByText("Active Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("handles disabled state correctly", () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <Link href="/test" disabled onClick={onClick}>
        Disabled Link
      </Link>,
    );

    const link = getByText("Disabled Link");
    expect(link).toBeTruthy();
    expect(link.getAttribute("aria-disabled")).toBe("true");

    // 클릭 이벤트가 발생하지 않아야 한다.
    fireEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles asChild prop correctly", () => {
    const onClick = vi.fn();
    const innerOnClick = vi.fn((e) => e.preventDefault());
    const { getByText } = render(
      <Link
        href="/test"
        asChild
        onClick={onClick}
        className="link-class"
        style={{ color: "blue" }}
      >
        <button
          onClick={innerOnClick}
          className="button-class"
          style={{ backgroundColor: "red" }}
        >
          Button Link
        </button>
      </Link>,
    );

    const button = getByText("Button Link");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("href")).toBe("/test");

    // 클릭 이벤트가 발생해야 한다.
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    expect(innerOnClick).toHaveBeenCalled();

    // 나머지 props도 제대로 전달되는지 확인
    expect(button.className).toContain("link-class");
    expect(button.className).toContain("button-class");
    expect(button.style.color).toBe("blue");
    expect(button.style.backgroundColor).toBe("red");
  });

  it("handles asChild prop with newtab, disabled and active correctly", () => {
    const { getByText } = render(
      <Link href="/test" asChild external disabled active>
        <button>Button Link</button>
      </Link>,
    );

    const button = getByText("Button Link");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("href")).toBe("/test");
    expect(button.getAttribute("target")).toBe("_blank");
    expect(button.getAttribute("rel")).toBe("noopener noreferrer");
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.getAttribute("aria-current")).toBe("page");
  });
});
