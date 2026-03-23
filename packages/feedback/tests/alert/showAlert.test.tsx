import { act, fireEvent, render } from "@testing-library/react";

import { showAlert } from "@/alert/api";
import { TestComponent } from "./_setup";

describe("alert - showAlert", () => {
  it("should handle close correctly (default options)", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    act(() => {
      showAlert("Test Alert", "This is a test alert message");
    });

    expect(getByText("Test Alert")).toBeTruthy();
    expect(getByText("This is a test alert message")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("닫기"));
    });

    expect(queryByText("Test Alert")).toBeFalsy();
    expect(queryByText("This is a test alert message")).toBeFalsy();
  });

  it("should handle close correctly (custom options)", async () => {
    const { getByText } = render(<TestComponent />);

    const onCloseMock = vi.fn();

    act(() => {
      showAlert("Test Alert", "This is a test alert message", {
        onClose: onCloseMock,
        closeText: "확인",
      });
    });

    expect(getByText("확인")).toBeTruthy();
    await act(async () => {
      fireEvent.click(getByText("확인"));
    });

    expect(onCloseMock).toHaveBeenCalled();
  });
});
