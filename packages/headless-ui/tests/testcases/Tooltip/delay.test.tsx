import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Tooltip - delay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("handles custom delay correctly", () => {
    const { getByRole, getByTestId, queryByRole } = render(
      <TestComponent delay={500} />,
    );

    const trigger = getByTestId("tooltip-trigger");

    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(queryByRole("tooltip")).toBeNull();

    act(() => vi.advanceTimersByTime(200));
    expect(getByRole("tooltip")).toBeTruthy();
  });

  it("handles focus during delay correctly", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    const trigger = getByTestId("tooltip-trigger");

    // 처음에 hover로 delay 시작
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(200));
    expect(queryByRole("tooltip")).toBeNull();

    // delay가 끝나기 전에 focus가 되면, delay가 초기화되고 곧바로 툴팁이 열려야 한다
    fireEvent.focus(trigger);
    expect(getByRole("tooltip")).toBeTruthy();
  });

  it("handles hideTooltip during delay correctly", () => {
    const { getByTestId, queryByRole } = render(<TestComponent />);

    const trigger = getByTestId("tooltip-trigger");

    // 처음에 hover로 delay 시작
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(200));
    expect(queryByRole("tooltip")).toBeNull();

    // delay가 끝나기 전에 hideTooltip이 호출되면, 툴팁이 열리지 않아야 한다 (아무 방식)
    fireEvent.blur(trigger);
    act(() => vi.advanceTimersByTime(200));
    expect(queryByRole("tooltip")).toBeNull();
  });
});
