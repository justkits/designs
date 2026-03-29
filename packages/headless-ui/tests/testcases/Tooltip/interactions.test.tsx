import { act, fireEvent, render } from "@testing-library/react";

import { setupTimer } from "../_setup";
import { TestComponent } from "./_setup";

describe("Tooltip - interactions", () => {
  setupTimer();

  describe("Clicks", () => {
    it("should not open the tooltip on clicks", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // Tooltip.Trigger를 클릭한다.
      fireEvent.click(getByTestId("tooltip-trigger"));

      // 클릭으로는 툴팁이 열리지 않아야 한다.
      expect(queryByTestId("tooltip-content")).toBeNull();
    });

    it("should close the tooltip on outside clicks when it's open", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // Tooltip.Trigger에 마우스를 올려 툴팁을 연다.
      fireEvent.mouseEnter(getByTestId("tooltip-trigger"));
      act(() => vi.advanceTimersByTime(300));
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Tooltip 내부를 클릭하면 툴팁은 닫히지 않는다.
      fireEvent.mouseDown(getByTestId("tooltip-content"));
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 준다.
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // 화면의 아무 곳이나 클릭하여 툴팁을 즉시 닫는다.
      fireEvent.mouseDown(document.body);
      expect(queryByTestId("tooltip-content")).toBeNull();
    });

    it("should close the tooltip on clicking the trigger when it's open", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // Tooltip.Trigger에 마우스를 올려 툴팁을 연다. (300ms delay)
      fireEvent.mouseEnter(getByTestId("tooltip-trigger"));
      act(() => vi.advanceTimersByTime(300));
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Tooltip.Trigger를 다시 클릭하여 툴팁을 닫는다. (mouse-down으로 처리)
      fireEvent.mouseDown(getByTestId("tooltip-trigger"));
      expect(queryByTestId("tooltip-content")).toBeNull();
    });
  });

  describe("Hover", () => {
    it("shows the tooltip on mouse enter and hides it on mouse leave", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // 초기에는 Tooltip.Content가 렌더링되지 않아야 한다.
      expect(queryByTestId("tooltip-content")).toBeNull();

      // Tooltip.Trigger에 마우스를 올려 툴팁을 연다. (300ms delay)
      fireEvent.mouseEnter(getByTestId("tooltip-trigger"));
      act(() => vi.advanceTimersByTime(300));
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Tooltip.Trigger에서 마우스를 내리면 툴팁이 닫혀야 한다. (700ms delay)
      fireEvent.mouseLeave(getByTestId("tooltip-trigger"));
      act(() => vi.advanceTimersByTime(700));
      expect(queryByTestId("tooltip-content")).toBeNull();
    });

    it("does not hide the tooltip if mouse enters the tooltip content while it's open", () => {
      const { getByTestId } = render(<TestComponent />);

      // Tooltip.Trigger에 마우스를 올려 툴팁을 연다. (500ms delay)
      fireEvent.mouseEnter(getByTestId("tooltip-trigger"));
      act(() => vi.advanceTimersByTime(500));
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Tooltip.Content에 마우스를 올려도 툴팁이 닫히지 않아야 한다.
      fireEvent.mouseLeave(getByTestId("tooltip-trigger"));
      fireEvent.mouseEnter(getByTestId("tooltip-content"));
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 보낸다.
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Tooltip.Content에서도 마우스를 내리면 툴팁이 닫혀야 한다. (700ms delay)
      fireEvent.mouseLeave(getByTestId("tooltip-content"));
      act(() => vi.advanceTimersByTime(700));
      expect(() => getByTestId("tooltip-content")).toThrow();
    });
  });

  describe("Focus", () => {
    it("shows the tooltip on focus and hides it on blur", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // 초기에는 Tooltip.Content가 렌더링되지 않아야 한다.
      expect(queryByTestId("tooltip-content")).toBeNull();

      // Tooltip.Trigger에 포커스를 이동시켜 툴팁을 연다. (no delay)
      act(() => getByTestId("tooltip-trigger").focus());
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Tooltip.Trigger에서 포커스를 이동시키면 툴팁이 닫혀야 한다. (no delay)
      act(() => getByTestId("tooltip-trigger").blur());
      expect(queryByTestId("tooltip-content")).toBeNull();
    });

    it("should keep focus on trigger when tooltip opens", () => {
      const { getByTestId } = render(<TestComponent />);

      const trigger = getByTestId("tooltip-trigger");
      // Tooltip.Trigger에 포커스를 이동시켜 툴팁을 연다. (no delay)
      act(() => trigger.focus());
      expect(document.activeElement).toBe(trigger);
    });

    it("should not trap focus within the tooltip content", () => {
      const { getByTestId } = render(<TestComponent />);

      // Tooltip.Trigger에 포커스를 이동시켜 툴팁을 연다. (no delay)
      act(() => getByTestId("tooltip-trigger").focus());
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Tab 키를 눌러 포커스를 이동시킨다.
      act(() => {
        fireEvent.keyDown(getByTestId("tooltip-trigger"), { key: "Tab" });
      });

      // 포커스가 Tooltip.Content로 이동하지 않고, 다음 tabbable 요소로 이동해야 한다.
      expect(document.activeElement).not.toBe(getByTestId("tooltip-content"));
    });
  });

  describe("Touch", () => {
    it("should open the tooltip on long press", () => {
      const { getByTestId } = render(<TestComponent />);

      // Tooltip.Trigger에 길게 터치하여 툴팁을 연다. (500ms delay)
      fireEvent.touchStart(getByTestId("tooltip-trigger"));
      act(() => vi.advanceTimersByTime(500)); // long press delay
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // 열린 이후 터치를 떼더라도 툴팁이 닫히지 않아야 한다.
      fireEvent.touchEnd(getByTestId("tooltip-trigger"));
      act(() => vi.advanceTimersByTime(2000)); // 충분히 긴 시간을 기다려준다.
      expect(getByTestId("tooltip-content")).toBeTruthy();
    });
  });

  describe("Keyboard", () => {
    it("closes the tooltip when Escape key is pressed", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // Focus를 이동시켜 곧바로 툴팁을 연다.
      act(() => getByTestId("tooltip-trigger").focus());
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // Escape 키를 눌러 툴팁을 닫는다.
      act(() => {
        fireEvent.keyDown(getByTestId("tooltip-content"), { key: "Escape" });
      });
      expect(queryByTestId("tooltip-content")).toBeNull();
    });
  });
});
