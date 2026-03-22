import { act, fireEvent, render } from "@testing-library/react";

import { showAlert } from "@/alert/manager";
import { TestComponent } from "./_setup";

describe("Alert - showAlert", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should display alert with correct title and message and handle close", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    act(() => {
      showAlert("Test Alert", "This is a test alert message");
    });

    expect(getByText("Test Alert")).toBeTruthy();
    expect(getByText("This is a test alert message")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("Close"));
    });

    // exit 애니메이션이 300ms 동안 진행된 후 Alert가 제거됩니다.
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(queryByText("Test Alert")).toBeFalsy();
    expect(queryByText("This is a test alert message")).toBeFalsy();
  });

  it("should handle close callback", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    const onCloseMock = vi.fn();

    act(() => {
      showAlert(
        "Test Alert with Callback",
        "This is a test alert message",
        onCloseMock,
      );
    });

    expect(getByText("Test Alert with Callback")).toBeTruthy();
    expect(getByText("This is a test alert message")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("Close"));
    });

    // exit 애니메이션이 300ms 동안 진행된 후 Alert가 제거됩니다.
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onCloseMock).toHaveBeenCalled();

    expect(queryByText("Test Alert with Callback")).toBeFalsy();
    expect(queryByText("This is a test alert message")).toBeFalsy();
  });
});
