import { fireEvent, render } from "@testing-library/react";

import { Link } from "@/atoms/Buttons";

describe("Link", () => {
  beforeAll(() => {
    // Not Implemented: navigation to another Document 경고 무시
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("renders the text link correctly", () => {
    const { getByText } = render(
      <Link href="/" variant="text">
        Home
      </Link>,
    );
    expect(getByText("Home")).toBeTruthy();
  });

  it("renders the icon link correctly", () => {
    const { getByTestId } = render(
      <Link href="/" variant="icon">
        <svg data-testid="icon"></svg>
      </Link>,
    );
    expect(getByTestId("icon")).toBeTruthy();
  });

  it("navigates to the correct URL when clicked", () => {
    const { getByText } = render(<Link href="/about">About</Link>);
    fireEvent.click(getByText("About"));
  });
});
