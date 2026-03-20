import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Tooltip - arrow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Renders arrow when tooltip is open", () => {
    const { getByTestId } = render(<TestComponent arrow />);

    // Open이 아닌 상태면, 화살표는 렌더되지 않아야 한다.
    expect(() => getByTestId("tooltip-arrow")).toThrow();

    fireEvent.mouseEnter(getByTestId("tooltip-trigger"));
    act(() => vi.advanceTimersByTime(300));

    expect(getByTestId("tooltip-arrow")).toBeTruthy();
  });

  it("Arrow is removed from DOM when tooltip is closed", () => {
    const { getByTestId } = render(<TestComponent arrow />);

    const trigger = getByTestId("tooltip-trigger");

    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(getByTestId("tooltip-arrow")).toBeTruthy();

    fireEvent.mouseLeave(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(() => getByTestId("tooltip-arrow")).toThrow();
  });
});
