import { fireEvent, render } from "@testing-library/react";

import { IconButton } from "@/atoms/Buttons";

describe("IconButton", () => {
  it("renders and handles click events correctly", () => {
    const onClickMock = vi.fn();

    const { getByTestId } = render(
      <IconButton
        icon="chevron-right"
        data-testid="icon-button"
        onClick={onClickMock}
      />,
    );

    const button = getByTestId("icon-button");
    expect(button).toBeTruthy();

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
