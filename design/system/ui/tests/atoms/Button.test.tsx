import { fireEvent, render } from "@testing-library/react";

import { Button } from "@/atoms/Buttons";

describe("Button", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );
    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the loading spinner when isLoading is true", () => {
    const { container } = render(<Button isLoading>Click Me</Button>);
    expect(container.querySelector("div")).toBeTruthy();
  });
});
