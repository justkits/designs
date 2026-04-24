import { render } from "@testing-library/react";

import { Text } from "@/atoms/Texts";

describe("Text", () => {
  it("renders the text with the correct content", () => {
    const { getByText } = render(
      <Text variant="description">Hello World</Text>,
    );
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("applies the 'as' prop correctly", () => {
    const { getByText } = render(
      <Text as="h1" variant="description">
        Heading 1
      </Text>,
    );
    expect(getByText("Heading 1").tagName).toBe("H1");
  });
});
