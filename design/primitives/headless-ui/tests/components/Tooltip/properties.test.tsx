import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import { Tooltip } from "@/components/Tooltip";
import { setupTimer } from "../_setup";
import { TestComponent } from "./_setup";

describe("Tooltip - properties", () => {
  describe("Custom Delays", () => {
    setupTimer();

    it("respects custom open and close delays", () => {
      const { getByTestId } = render(
        <TestComponent openDelay={500} closeDelay={300}>
          Tooltip Message
        </TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 보이지 않는다.
      expect(content.dataset.state).toBe("closed");

      // 트리거에 마우스를 올리면, openDelay 후에 툴팁이 열려야 한다.
      fireEvent.mouseEnter(trigger);
      act(() => vi.advanceTimersByTime(499));
      expect(content.dataset.state).toBe("closed");
      act(() => vi.advanceTimersByTime(1));
      expect(content.dataset.state).toBe("open");

      // 트리거에서 마우스를 내리면, closeDelay 후에 툴팁이 닫혀야 한다.
      fireEvent.mouseLeave(trigger);
      act(() => vi.advanceTimersByTime(299));
      expect(content.dataset.state).toBe("open");
      act(() => vi.advanceTimersByTime(1));
      expect(content.dataset.state).toBe("closed");
    });

    it("respects custom long touch delay", () => {
      const { getByTestId } = render(
        <TestComponent longTouchDelay={700}>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 보이지 않는다.
      expect(content.dataset.state).toBe("closed");

      // 트리거를 길게 누르면, longTouchDelay 후에 툴팁이 열려야 한다.
      fireEvent.touchStart(trigger);
      act(() => vi.advanceTimersByTime(699));
      expect(content.dataset.state).toBe("closed");
      act(() => vi.advanceTimersByTime(1));
      expect(content.dataset.state).toBe("open");
    });
  });

  describe("portal", () => {
    it("supports portal mode", () => {
      // portal 모드에서는, content가 document.body에 렌더링되어야 한다.
      const { getByTestId } = render(
        <TestComponent portal>Tooltip Message</TestComponent>,
      );

      expect(getByTestId("tooltip-content").parentElement).toBe(document.body);

      // trigger는 portal 안에 포함되지 않는다.
      expect(getByTestId("tooltip-trigger").parentElement).not.toBe(
        document.body,
      );
    });

    it("supports non-portal mode", () => {
      // portal 모드가 아니면, content가 document.body가 아닌, div 내부에 렌더링되어야 한다.
      const { getByTestId } = render(
        <div data-testid="container">
          <TestComponent>Tooltip Message</TestComponent>
        </div>,
      );

      expect(getByTestId("tooltip-content").parentElement).toBe(
        getByTestId("container"),
      );

      // trigger도 같은 div 내부에 렌더링되어야 한다.
      expect(getByTestId("tooltip-trigger").parentElement).toBe(
        getByTestId("container"),
      );
    });
  });

  describe("unmountOnHide", () => {
    it("supports unmountOnHide property", () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent unmountOnHide>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");

      // 초기에는 Tooltip.Content가 렌더링되지 않아야 한다.
      expect(queryByTestId("tooltip-content")).toBeNull();

      // Trigger에 포커스하여 툴팁을 연다.
      act(() => trigger.focus());
      // Tooltip.Content가 렌더링되어야 한다.
      expect(queryByTestId("tooltip-content")).toBeTruthy();

      // Trigger에서 포커스가 해제되면 툴팁이 닫혀야 한다.
      act(() => trigger.blur());
      // Tooltip.Content가 언마운트되어야 한다.
      expect(queryByTestId("tooltip-content")).toBeNull();
    });

    it("should handle unmountOnHide = false correctly", () => {
      const { getByTestId } = render(
        <TestComponent unmountOnHide={false}>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 Tooltip.Content가 렌더링되어 있지만, 닫혀 있어야 한다.
      expect(content).toBeTruthy();
      expect(content.dataset.state).toBe("closed");

      // Trigger에 포커스하여 툴팁을 연다.
      act(() => trigger.focus());
      // Tooltip.Content가 열려야 한다.
      expect(content.dataset.state).toBe("open");

      // Trigger에서 포커스가 해제되면 툴팁이 닫혀야 한다.
      act(() => trigger.blur());
      // Tooltip.Content는 언마운트되지 않고, 닫혀야 한다.
      expect(content).toBeTruthy();
      expect(content.dataset.state).toBe("closed");
    });
  });

  it("supports controlled mode with isOpen and onOpenChange", () => {
    const onOpenChange = vi.fn();
    const ControlledTestComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange(open);
      };

      return (
        <TestComponent isOpen={isOpen} onOpenChange={handleOpenChange}>
          Tooltip Message
        </TestComponent>
      );
    };
    const { getByTestId } = render(<ControlledTestComponent />);

    const trigger = getByTestId("tooltip-trigger");
    const content = getByTestId("tooltip-content");

    expect(content.dataset.state).toBe("closed");

    act(() => trigger.focus());
    expect(content.dataset.state).toBe("open");

    act(() => trigger.blur());
    expect(content.dataset.state).toBe("closed");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  describe("disabled state", () => {
    setupTimer();

    it("supports disabled state", () => {
      const { getByTestId } = render(
        <TestComponent disabled>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 보이지 않는다.
      expect(content.dataset.state).toBe("closed");

      // 트리거에 마우스를 올려도 툴팁이 열리지 않아야 한다.
      fireEvent.mouseEnter(trigger);
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 보낸다.
      expect(content.dataset.state).toBe("closed");

      // 트리거를 길게 눌러도 툴팁이 열리지 않아야 한다.
      fireEvent.touchStart(trigger);
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 보낸다.
      expect(content.dataset.state).toBe("closed");
    });

    it("should respect disabled state even on asChild trigger", () => {
      const { getByTestId } = render(
        <Tooltip disabled>
          <Tooltip.Trigger asChild>
            <button data-testid="custom-trigger">Custom Trigger</button>
          </Tooltip.Trigger>
          <Tooltip.Content data-testid="tooltip-content">
            <Tooltip.Message>Tooltip Message</Tooltip.Message>
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip>,
      );

      const trigger = getByTestId("custom-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 보이지 않는다.
      expect(content.dataset.state).toBe("closed");

      // 트리거에 마우스를 올려도 툴팁이 열리지 않아야 한다.
      fireEvent.mouseEnter(trigger);
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 보낸다.
      expect(content.dataset.state).toBe("closed");

      // 트리거를 길게 눌러도 툴팁이 열리지 않아야 한다.
      fireEvent.touchStart(trigger);
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 보낸다.
      expect(content.dataset.state).toBe("closed");

      // 트리거로 포커스가 이동해도 툴팁이 열리지 않아야 한다.
      act(() => trigger.focus());
      expect(content.dataset.state).toBe("closed");
    });
  });
});
