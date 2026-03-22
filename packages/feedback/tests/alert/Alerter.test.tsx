import { act, fireEvent, render } from "@testing-library/react";

import { showConfirm } from "@/alert/manager";
import { TestComponent } from "./_setup";

describe("Alert - showConfirm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should display confirm with correct title and message and handle confirm", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    const onConfirmMock = vi.fn();

    act(() => {
      showConfirm(
        "Test Confirm",
        "This is a test confirm message",
        onConfirmMock,
      );
    });

    expect(getByText("Test Confirm")).toBeTruthy();
    expect(getByText("This is a test confirm message")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("Confirm"));
    });

    // exit 애니메이션이 300ms 동안 진행된 후 Confirm이 제거됩니다.
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onConfirmMock).toHaveBeenCalled();

    expect(queryByText("Test Confirm")).toBeFalsy();
    expect(queryByText("This is a test confirm message")).toBeFalsy();
  });

  it("should handle cancel (no callback)", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    act(() => {
      showConfirm(
        "Test Confirm Cancel",
        "This is a test confirm message",
        vi.fn(),
      );
    });

    expect(getByText("Test Confirm Cancel")).toBeTruthy();
    expect(getByText("This is a test confirm message")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("Cancel"));
    });

    // exit 애니메이션이 300ms 동안 진행된 후 Confirm이 제거됩니다.
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(queryByText("Test Confirm Cancel")).toBeFalsy();
    expect(queryByText("This is a test confirm message")).toBeFalsy();
  });

  it("should handle cancel (with callback)", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    const onCancelMock = vi.fn();

    act(() => {
      showConfirm(
        "Test Confirm Cancel Callback",
        "This is a test confirm message",
        vi.fn(),
        onCancelMock,
      );
    });

    expect(getByText("Test Confirm Cancel Callback")).toBeTruthy();
    expect(getByText("This is a test confirm message")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("Cancel"));
    });

    // exit 애니메이션이 300ms 동안 진행된 후 Confirm이 제거됩니다.
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onCancelMock).toHaveBeenCalled();

    expect(queryByText("Test Confirm Cancel Callback")).toBeFalsy();
    expect(queryByText("This is a test confirm message")).toBeFalsy();
  });
});
