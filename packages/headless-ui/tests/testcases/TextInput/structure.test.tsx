import { render } from "@testing-library/react";

import { TextInput } from "@/TextInput";

describe("TextInput - Structure", () => {
  describe("TextInput.Label", () => {
    it("must be used within the TextInput wrapper", () => {
      expect(() => render(<TextInput.Label>Label</TextInput.Label>)).toThrow(
        "TextInput components must be used within the TextInput wrapper",
      );
    });

    it("supports asChild property", () => {
      const { getByTestId } = render(
        <TextInput>
          <TextInput.Label asChild>
            <p data-testid="custom-label">Custom Label</p>
          </TextInput.Label>
        </TextInput>,
      );

      const label = getByTestId("custom-label");

      expect(label).toBeTruthy();
      expect(label.tagName).toBe("P");
    });
  });

  describe("TextInput.Input", () => {
    it("must be used within the TextInput wrapper", () => {
      expect(() => render(<TextInput.Input />)).toThrow(
        "TextInput components must be used within the TextInput wrapper",
      );
    });

    it("supports asChild property", () => {
      const { getByTestId } = render(
        <TextInput>
          <TextInput.Input asChild>
            <input data-testid="custom-input" />
          </TextInput.Input>
        </TextInput>,
      );

      const input = getByTestId("custom-input");

      expect(input).toBeTruthy();
      expect(input.tagName).toBe("INPUT");
    });
  });

  describe("TextInput.ErrorMessage", () => {
    it("must be used within the TextInput wrapper", () => {
      expect(() =>
        render(<TextInput.ErrorMessage>Error</TextInput.ErrorMessage>),
      ).toThrow(
        "TextInput components must be used within the TextInput wrapper",
      );
    });

    it("supports asChild property", () => {
      const { getByTestId } = render(
        <TextInput>
          <TextInput.ErrorMessage asChild>
            <h4 data-testid="custom-error">Custom Error</h4>
          </TextInput.ErrorMessage>
        </TextInput>,
      );

      const errorMessage = getByTestId("custom-error");

      expect(errorMessage).toBeTruthy();
      expect(errorMessage.tagName).toBe("H4");
    });
  });
});
