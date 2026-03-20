import { act, fireEvent, render } from "@testing-library/react";

import { ControlledComponent } from "./_setup";

describe("Tooltip - trigger cornercases", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("handles controlled open state correctly", () => {
    const { getByTestId, getByText } = render(<ControlledComponent />);

    const trigger = getByTestId("tooltip-trigger");
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));

    const tooltip = getByText("툴팁 메시지");

    // 트리거 요소에 aria-describedby 속성이 올바르게 설정되어 있는지 확인
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id);
  });

  it("handles interactions on asChild element correctly", () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { getByTestId } = render(
      <ControlledComponent
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      />,
    );

    const trigger = getByTestId("tooltip-trigger");

    // 마우스 이벤트 테스트
    fireEvent.mouseEnter(trigger);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(trigger);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);

    // 포커스 이벤트 테스트
    fireEvent.focus(trigger);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(trigger);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
