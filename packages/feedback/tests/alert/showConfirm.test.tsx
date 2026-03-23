import { act, fireEvent, render } from "@testing-library/react";

import { showConfirm } from "@/alert/api";
import { TestComponent } from "./_setup";

describe("alert - showConfirm", () => {
  it("should handle confirm correctly (default confirm text)", async () => {
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
      fireEvent.click(getByText("확인"));
    });

    expect(onConfirmMock).toHaveBeenCalled();

    expect(queryByText("Test Confirm")).toBeFalsy();
    expect(queryByText("This is a test confirm message")).toBeFalsy();
  });

  it("should handle confirm correctly (custom confirm text)", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    const onConfirmMock = vi.fn();

    act(() => {
      showConfirm(
        "Test Confirm",
        "This is a test confirm message",
        onConfirmMock,
        { confirmText: "네" },
      );
    });

    expect(getByText("네")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("네"));
    });

    expect(onConfirmMock).toHaveBeenCalled();

    expect(queryByText("Test Confirm")).toBeFalsy();
    expect(queryByText("This is a test confirm message")).toBeFalsy();
  });

  it("should handle cancel correctly (default cancel text)", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    act(() => {
      showConfirm("Test Confirm", "This is a test confirm message", vi.fn());
    });

    expect(getByText("취소")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("취소"));
    });

    expect(queryByText("Test Confirm")).toBeFalsy();
    expect(queryByText("This is a test confirm message")).toBeFalsy();
  });

  it("should handle cancel correctly (custom options)", async () => {
    const { getByText, queryByText } = render(<TestComponent />);

    const onCancelMock = vi.fn();

    act(() => {
      showConfirm("Test Confirm", "This is a test confirm message", vi.fn(), {
        cancelText: "아니요",
        onCancel: onCancelMock,
      });
    });

    expect(getByText("아니요")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("아니요"));
    });

    expect(onCancelMock).toHaveBeenCalled();

    expect(queryByText("Test Confirm")).toBeFalsy();
    expect(queryByText("This is a test confirm message")).toBeFalsy();
  });
});
