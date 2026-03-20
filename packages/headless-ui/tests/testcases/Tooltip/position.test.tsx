import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./_setup";
import { FloatingPlacement } from "@/_placement";

describe("Tooltip - position", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
    vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const checkTooltipPosition = (
    tooltip: HTMLElement,
    expectedPosition: string,
  ) => {
    if (expectedPosition === "top") {
      expect(tooltip.style.top).toBe("0px"); // 위에 위치
      expect(tooltip.style.left).toBe("50%"); // 수평 중앙 정렬
      expect(tooltip.style.transform).toBe(
        "translateX(calc(-50% + 16px)) translateY(calc(-100% + 0px))",
      ); // 수평 중앙 정렬
    } else if (expectedPosition === "bottom") {
      expect(tooltip.style.bottom).toBe("0px"); // 아래에 위치
      expect(tooltip.style.left).toBe("50%"); // 수평 중앙 정렬
      expect(tooltip.style.transform).toBe(
        "translateX(calc(-50% + 16px)) translateY(calc(100% + 0px))",
      ); // 수평 중앙 정렬
    } else if (expectedPosition === "left") {
      expect(tooltip.style.left).toBe("0px"); // 왼쪽에 위치
      expect(tooltip.style.top).toBe("50%"); // 수직 중앙 정렬
      expect(tooltip.style.transform).toBe(
        "translateX(calc(-100% + 0px)) translateY(calc(-50% + 16px))",
      ); // 수직 중앙 정렬
    } else {
      expect(tooltip.style.right).toBe("0px"); // 오른쪽에 위치
      expect(tooltip.style.top).toBe("50%"); // 수직 중앙 정렬
      expect(tooltip.style.transform).toBe(
        "translateX(calc(100% + 0px)) translateY(calc(-50% + 16px))",
      ); // 수직 중앙 정렬
    }
  };

  const checkArrowPosition = (arrow: HTMLElement, expectedPosition: string) => {
    if (expectedPosition === "top") {
      expect(arrow.style.bottom).toBe("0px"); // 화살표는 툴팁의 아래쪽에 위치
      expect(arrow.style.left).toBe("50%");
      expect(arrow.style.marginBottom).toBe("-4px");
      expect(arrow.style.transform).toBe(
        "translateX(calc(-50% - 16px)) translateY(0px) rotate(45deg)",
      ); // 화살표는 툴팁의 중앙에 위치
    } else if (expectedPosition === "bottom") {
      expect(arrow.style.top).toBe("0px"); // 화살표는 툴팁의 위쪽에 위치
      expect(arrow.style.left).toBe("50%");
      expect(arrow.style.marginTop).toBe("-4px");
      expect(arrow.style.transform).toBe(
        "translateX(calc(-50% - 16px)) translateY(0px) rotate(45deg)",
      ); // 화살표는 툴팁의 중앙에 위치
    } else if (expectedPosition === "left") {
      expect(arrow.style.right).toBe("0px"); // 화살표는 툴팁의 오른쪽에 위치
      expect(arrow.style.top).toBe("50%");
      expect(arrow.style.marginRight).toBe("-8px");
      expect(arrow.style.transform).toBe(
        "translateX(0px) translateY(calc(-50% - 16px))",
      ); // 화살표는 툴팁의 중앙에 위치
    } else {
      expect(arrow.style.left).toBe("0px"); // 화살표는 툴팁의 왼쪽에 위치
      expect(arrow.style.top).toBe("50%");
      expect(arrow.style.marginLeft).toBe("-8px");
      expect(arrow.style.transform).toBe(
        "translateX(0px) translateY(calc(-50% - 16px)) rotate(180deg)",
      ); // 화살표는 툴팁의 중앙에 위치
    }
  };

  const renderAndHover = (tooltipPosition: FloatingPlacement) => {
    const { getByTestId } = render(
      <TestComponent position={tooltipPosition} arrow />,
    );

    const trigger = getByTestId("tooltip-trigger");

    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));

    const tooltip = getByTestId("tooltip-content");
    const arrow = getByTestId("tooltip-arrow");

    return { tooltip, arrow };
  };

  const needSpace = (position: "top" | "left") => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: position === "top" ? 100 : 0,
      bottom: 600,
      left: position === "left" ? 100 : 0,
      right: 800,
      width: 50,
      height: 20,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  };

  describe("top", () => {
    it("renders on top", () => {
      needSpace("top");
      const { tooltip, arrow } = renderAndHover("top");

      checkTooltipPosition(tooltip, "top");
      checkArrowPosition(arrow, "top");
    });

    it("flips to bottom when there is not enough space above", () => {
      const { tooltip, arrow } = renderAndHover("top");

      checkTooltipPosition(tooltip, "bottom");
      checkArrowPosition(arrow, "bottom");
    });
  });

  describe("bottom", () => {
    it("renders on bottom", () => {
      const { tooltip, arrow } = renderAndHover("bottom");

      checkTooltipPosition(tooltip, "bottom");
      checkArrowPosition(arrow, "bottom");
    });

    it("flips to top when there is not enough space below", () => {
      needSpace("top");
      const { tooltip, arrow } = renderAndHover("bottom");

      checkTooltipPosition(tooltip, "top");
      checkArrowPosition(arrow, "top");
    });
  });

  describe("left", () => {
    it("renders on left", () => {
      needSpace("left");
      const { tooltip, arrow } = renderAndHover("left");

      checkTooltipPosition(tooltip, "left");
      checkArrowPosition(arrow, "left");
    });

    it("flips to right when there is not enough space on the left", () => {
      const { tooltip, arrow } = renderAndHover("left");

      checkTooltipPosition(tooltip, "right");
      checkArrowPosition(arrow, "right");
    });
  });

  describe("right", () => {
    it("renders on right", () => {
      const { tooltip, arrow } = renderAndHover("right");

      checkTooltipPosition(tooltip, "right");
      checkArrowPosition(arrow, "right");
    });

    it("flips to left when there is not enough space on the right", () => {
      needSpace("left");
      const { tooltip, arrow } = renderAndHover("right");

      checkTooltipPosition(tooltip, "left");
      checkArrowPosition(arrow, "left");
    });
  });

  describe("shift", () => {
    it("shifts left when tooltip overflows the right edge", () => {
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 300,
        bottom: 320,
        left: 760,
        right: 810,
        width: 50,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
      const { tooltip } = renderAndHover("bottom");

      expect(tooltip.style.transform).toBe(
        "translateX(calc(-50% + -26px)) translateY(calc(100% + 0px))",
      );
    });

    it("does not shift when the tooltip fits within the viewport", () => {
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 300,
        bottom: 320,
        left: 200,
        right: 250,
        width: 50,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
      const { tooltip } = renderAndHover("left");

      expect(tooltip.style.transform).toBe(
        "translateX(calc(-100% + 0px)) translateY(calc(-50% + 0px))",
      );
    });

    it("shifts up when tooltip overflows the bottom edge", () => {
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 570,
        bottom: 600,
        left: 200,
        right: 250,
        width: 50,
        height: 30,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
      const { tooltip } = renderAndHover("left");

      expect(tooltip.style.transform).toBe(
        "translateX(calc(-100% + 0px)) translateY(calc(-50% + -16px))",
      );
    });

    it("updates position when the wrapper is resized", () => {
      let triggerResize: (() => void) | undefined;
      vi.stubGlobal(
        "ResizeObserver",
        class {
          constructor(cb: () => void) {
            triggerResize = cb;
          }
          observe() {
            // no-op
          }
          unobserve() {
            // no-op
          }
          disconnect() {
            // no-op
          }
        },
      );

      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect")
        .mockReturnValueOnce({
          top: 300,
          bottom: 320,
          left: 100,
          right: 150,
          width: 50,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        })
        .mockReturnValueOnce({
          top: 300,
          bottom: 320,
          left: 100,
          right: 150,
          width: 50,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        })
        .mockReturnValue({
          top: 300,
          bottom: 320,
          left: 760,
          right: 810,
          width: 50,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        });

      const { getByTestId } = render(<TestComponent position="bottom" arrow />);
      const trigger = getByTestId("tooltip-trigger");
      fireEvent.mouseEnter(trigger);
      act(() => vi.advanceTimersByTime(300));

      const tooltip = getByTestId("tooltip-content");

      act(() => {
        triggerResize?.();
      });

      expect(tooltip.style.transform).toBe(
        "translateX(calc(-50% + -26px)) translateY(calc(100% + 0px))",
      );
    });
  });
});
