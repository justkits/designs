import { render } from "@testing-library/react";

import { TextInput } from "@/TextInput";

describe("TextInput", () => {
  it("renders an input element with the correct type", () => {
    const { getByRole } = render(<TextInput type="email" />);
    const input = getByRole("textbox");
    expect(input.getAttribute("type")).toBe("email");
  });

  it("renders an input element with the default type of text", () => {
    const { getByRole } = render(<TextInput />);
    const input = getByRole("textbox");
    expect(input.getAttribute("type")).toBe("text");
  });

  it("handles the asChild prop correctly", () => {
    const { getByTestId } = render(
      <TextInput asChild>
        <input type="password" data-testid="password-input" />
      </TextInput>,
    );
    const input = getByTestId("password-input");
    expect(input.getAttribute("type")).toBe("password");
  });
});
