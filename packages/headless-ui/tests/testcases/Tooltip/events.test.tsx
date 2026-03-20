import { act, fireEvent, render } from "@testing-library/react";
import { useState } from "react";

import { Tooltip } from "@/Tooltip";
import { TestComponent } from "./_setup";

function TwoTooltips() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  return (
    <>
      <Tooltip isOpen={open1} onOpenChange={setOpen1}>
        <Tooltip.Trigger>첫 번째 트리거</Tooltip.Trigger>
        <Tooltip.Content>첫 번째 툴팁</Tooltip.Content>
      </Tooltip>
      <Tooltip isOpen={open2} onOpenChange={setOpen2}>
        <Tooltip.Trigger>두 번째 트리거</Tooltip.Trigger>
        <Tooltip.Content>두 번째 툴팁</Tooltip.Content>
      </Tooltip>
    </>
  );
}

describe("Tooltip - events", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("handles tooltip on hover correctly", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    // Trigger는 항상 보인다
    const trigger = getByTestId("tooltip-trigger");
    expect(trigger).toBeTruthy();

    // 초기 상태는 닫힌 상태여야 한다
    expect(queryByRole("tooltip")).toBeNull();

    // 호버를 하더라도 delay 이전에는 보여지면 안 된다 - delay 기본값은 300ms
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(200));
    expect(queryByRole("tooltip")).toBeNull();

    // delay 이후에는 보여져야 한다
    act(() => vi.advanceTimersByTime(100));
    expect(getByRole("tooltip")).toBeTruthy();

    // 마우스를 벗어나면 콘텐츠를 숨긴다
    fireEvent.mouseLeave(trigger);
    expect(queryByRole("tooltip")).toBeNull();
  });

  it("handles tooltip on focus/blur correctly", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    const trigger = getByTestId("tooltip-trigger");

    // 초기 상태 확인
    expect(queryByRole("tooltip")).toBeNull();
    expect(trigger).toBeTruthy();

    // 포커스가 되면 즉시 콘텐츠를 보여준다
    fireEvent.focus(trigger);
    expect(getByRole("tooltip")).toBeTruthy();

    // 블러가 되면 콘텐츠를 숨긴다
    fireEvent.blur(trigger);
    expect(() => getByRole("tooltip")).toThrow();
  });

  it("handles tooltip on long touch correctly", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    const trigger = getByTestId("tooltip-trigger");

    // 초기 상태 확인
    expect(trigger).toBeTruthy();
    expect(queryByRole("tooltip")).toBeNull();

    // 터치 + delay가 되면 콘텐츠를 표시한다
    fireEvent.touchStart(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(queryByRole("tooltip")).toBeNull();

    act(() => vi.advanceTimersByTime(300));
    expect(getByRole("tooltip")).toBeTruthy();

    // 열린 상태에서 다른 곳을 터치하면 닫힌다
    const outsideButton = getByTestId("outside-button");
    fireEvent.touchStart(outsideButton);
    expect(queryByRole("tooltip")).toBeNull();
  });

  it("hides tooltip on outer touch", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    const trigger = getByTestId("tooltip-trigger");
    const outsideButton = getByTestId("outside-button");

    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(getByRole("tooltip")).toBeTruthy();

    // 외부 버튼을 터치하면 툴팁이 닫힌다
    fireEvent.touchStart(outsideButton);
    expect(queryByRole("tooltip")).toBeNull();
  });

  it("hides tooltip on outer click", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    const trigger = getByTestId("tooltip-trigger");

    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(getByRole("tooltip")).toBeTruthy();

    // 외부 버튼을 클릭하면 툴팁이 닫힌다
    const outsideButton = getByTestId("outside-button");
    fireEvent.mouseDown(outsideButton);
    expect(queryByRole("tooltip")).toBeNull();
  });

  it("hides tooltip on Escape key press", () => {
    const { getByRole, getByTestId, queryByRole } = render(<TestComponent />);

    const trigger = getByTestId("tooltip-trigger");

    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(getByRole("tooltip")).toBeTruthy();

    // Escape 키가 아닌 다른 키를 누르면 툴팁이 닫히면 안 된다
    fireEvent.keyDown(globalThis.window, { key: "Enter" });
    expect(getByRole("tooltip")).toBeTruthy();

    // Escape 키를 누르면 툴팁이 닫혀야 한다
    fireEvent.keyDown(globalThis.window, { key: "Escape" });
    expect(queryByRole("tooltip")).toBeNull();

    // 닫힌 상태에서 Escape를 눌러도 아무 일도 일어나지 않는다
    fireEvent.keyDown(globalThis.window, { key: "Escape" });
    expect(queryByRole("tooltip")).toBeNull();
  });

  it("hides all open tooltips on Escape when multiple tooltips are open", () => {
    const { getAllByRole, queryAllByRole } = render(<TwoTooltips />);

    expect(getAllByRole("tooltip")).toHaveLength(2);

    fireEvent.keyDown(globalThis.window, { key: "Escape" });

    expect(queryAllByRole("tooltip")).toHaveLength(0);
  });
});
