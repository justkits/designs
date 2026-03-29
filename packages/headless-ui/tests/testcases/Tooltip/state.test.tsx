import { act, fireEvent, render } from "@testing-library/react";

import { Tooltip } from "@/Tooltip";
import { setupTimer } from "../_setup";
import { TestComponent } from "./_setup";

describe("Tooltip - state", () => {
  setupTimer();

  it("supports uncontrolled mode", () => {
    // Tooltip.Trigger과 Tooltip.Message이 내부적으로 열기/닫기를 처리한다.
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    expect(queryByTestId("tooltip-message")).toBeNull();

    // 열려면 호버를 하고 delay만큼 기다려야 한다.
    fireEvent.mouseOver(getByTestId("tooltip-trigger"));
    act(() => vi.advanceTimersByTime(300));
    expect(getByTestId("tooltip-message")).toBeTruthy();
  });

  it("supports controlled mode with isOpen and onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const { getByTestId, queryByTestId, rerender } = render(
      <Tooltip isOpen={false} onOpenChange={onOpenChange}>
        <Tooltip.Trigger data-testid="trigger">Trigger</Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Message data-testid="message">Message</Tooltip.Message>
        </Tooltip.Content>
      </Tooltip>,
    );

    expect(queryByTestId("message")).toBeNull();

    rerender(
      <Tooltip isOpen={true} onOpenChange={onOpenChange}>
        <Tooltip.Trigger data-testid="trigger">Trigger</Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Message data-testid="message">Message</Tooltip.Message>
        </Tooltip.Content>
      </Tooltip>,
    );

    expect(getByTestId("message")).toBeTruthy();

    await act(async () => {
      fireEvent.mouseOut(getByTestId("trigger"));
      vi.advanceTimersByTime(700);
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not open tooltip when disabled", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent disabled />);

    expect(queryByTestId("tooltip-message")).toBeNull();

    fireEvent.mouseOver(getByTestId("tooltip-trigger"));
    act(() => vi.advanceTimersByTime(300));
    expect(queryByTestId("tooltip-message")).toBeNull();
  });
});
