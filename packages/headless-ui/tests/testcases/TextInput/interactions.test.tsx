import { fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("TextInput - Interactions", () => {
  it("updates input value on change", () => {
    const { getByRole } = render(<TestComponent />);

    const input = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("");

    input.value = "Hello, World!";
    input.dispatchEvent(new Event("input"));

    expect(input.value).toBe("Hello, World!");
  });

  it("displays error message when error state is set", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    expect(queryByText("This is an error message")).toBeNull();

    fireEvent.click(getByText("Set Error"));

    expect(getByText("This is an error message")).toBeTruthy();

    fireEvent.click(getByText("Clear Error"));

    expect(queryByText("This is an error message")).toBeNull();
  });
});
