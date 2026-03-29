import { act, fireEvent, render } from "@testing-library/react";

import * as updatePosition from "@/core/placement/updatePosition";
import { setupTimer } from "../_setup";
import {
  checkArrowPosition,
  checkTooltipPosition,
  renderAndHover,
  TestComponent,
} from "./_setup";

describe("Tooltip - options", () => {
  setupTimer();

  beforeEach(() => {
    vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
    vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);

    // trigger나 floating의 기본값
    // 즉, trigger의 중앙은 (18, 8)이고,
    // floating의 절반 크기도 (18, 8)이다.
    // 즉, position prop에 left나 top을 시도하면 flip이 필요한 상황이고,
    // offset만 추가하면, shift도 필요해진다. (0일땐 필요가 없다)
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: 0,
      bottom: 16,
      left: 0,
      right: 36,
      width: 36,
      height: 16,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("delay", () => {
    it("should handle openDelay and closeDelay correctly", () => {
      const { getByTestId } = render(
        <TestComponent openDelay={1000} closeDelay={1000} />,
      );

      // 처음에는 Trigger만 보인다.
      expect(getByTestId("tooltip-trigger")).toBeTruthy();
      expect(() => getByTestId("tooltip-content")).toThrow();

      fireEvent.mouseEnter(getByTestId("tooltip-trigger"));

      // 0.5초 후에는 안보여야한다.
      act(() => vi.advanceTimersByTime(500));
      expect(() => getByTestId("tooltip-content")).toThrow();

      // 1초 후에는 Content가 보여야 한다.
      act(() => vi.advanceTimersByTime(500)); // 이미 500초가 지났으니 500초만 추가로 경과
      expect(getByTestId("tooltip-content")).toBeTruthy();

      fireEvent.mouseLeave(getByTestId("tooltip-trigger"));

      // 0.5초 후에는 여전히 보여야 한다.
      act(() => vi.advanceTimersByTime(500));
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // 1초 후에 Content가 사라져야 한다.
      act(() => vi.advanceTimersByTime(500));
      expect(() => getByTestId("tooltip-content")).toThrow();
    });

    it("should handle openDelay and closeDelay in controlled mode", () => {
      const { getByTestId } = render(
        <TestComponent mode="controlled" openDelay={1000} closeDelay={1000} />,
      );

      // 처음에는 Trigger만 보인다.
      expect(getByTestId("tooltip-trigger")).toBeTruthy();
      expect(() => getByTestId("tooltip-content")).toThrow();

      fireEvent.mouseEnter(getByTestId("tooltip-trigger"));
      // 0.5초 후에는 안보여야한다.
      act(() => vi.advanceTimersByTime(500));
      expect(() => getByTestId("tooltip-content")).toThrow();

      // 1초 후에는 Content가 보여야 한다.
      act(() => vi.advanceTimersByTime(500));
      expect(getByTestId("tooltip-content")).toBeTruthy();

      fireEvent.mouseLeave(getByTestId("tooltip-trigger"));
      // 0.5초 후에는 여전히 보여야 한다.
      act(() => vi.advanceTimersByTime(500));
      expect(getByTestId("tooltip-content")).toBeTruthy();

      // 1초 후에 Content가 사라져야 한다.
      act(() => vi.advanceTimersByTime(500));
      expect(() => getByTestId("tooltip-content")).toThrow();
    });

    it("should handle longTouchDuration correctly", () => {
      const { getByTestId } = render(
        <TestComponent longTouchDuration={1000} />,
      );

      // 처음에는 Trigger만 보인다.
      expect(getByTestId("tooltip-trigger")).toBeTruthy();
      expect(() => getByTestId("tooltip-content")).toThrow();

      fireEvent.touchStart(getByTestId("tooltip-trigger"));

      // 0.5초 후에는 안보여야한다.
      act(() => vi.advanceTimersByTime(500));
      expect(() => getByTestId("tooltip-content")).toThrow();

      // 1초 후에는 Content가 보여야 한다.
      act(() => vi.advanceTimersByTime(500));
      expect(getByTestId("tooltip-content")).toBeTruthy();
    });
  });

  describe("position", () => {
    it("should apply the correct default position (bottom)", () => {
      // bottom, offset=0: naturalX=0, y=triggerBottom(16)+0=16, shiftX=0 → x=0, y=16
      const { tooltip, arrow } = renderAndHover("bottom");

      checkTooltipPosition(tooltip, 0, 16);
      checkArrowPosition(arrow, "bottom");
    });

    it("should re-position the tooltip on window resize or scroll", () => {
      // flipIfNeeded와 computePosition이 window resize나 scroll에도 적용되는지 테스트한다.
      const flipMock = vi.fn();
      const computeMock = vi
        .fn()
        .mockReturnValue({ x: 0, y: 0, shiftX: 0, shiftY: 0 });
      vi.spyOn(updatePosition, "flipIfNeeded").mockImplementation(flipMock);
      vi.spyOn(updatePosition, "computePosition").mockImplementation(
        computeMock,
      );

      render(<TestComponent mode="always-open" position="bottom" />);

      expect(flipMock).toHaveBeenCalled();
      expect(computeMock).toHaveBeenCalled();

      // flipMock과 computeMock을 초기화하고 window resize 이벤트를 발생시킨다.
      flipMock.mockClear();
      computeMock.mockClear();
      act(() => {
        globalThis.window.dispatchEvent(new Event("resize"));
      });

      expect(flipMock).toHaveBeenCalled();
      expect(computeMock).toHaveBeenCalled();

      // flipMock과 computeMock을 초기화하고 window scroll 이벤트를 발생시킨다.
      flipMock.mockClear();
      computeMock.mockClear();
      act(() => {
        globalThis.window.dispatchEvent(new Event("scroll"));
      });

      expect(flipMock).toHaveBeenCalled();
      expect(computeMock).toHaveBeenCalled();
    });

    it("should re-position the tooltip on trigger or content resize", () => {
      // flipIfNeeded와 computePosition이 trigger나 content의 resize에도 적용되는지 테스트한다.
      const flipMock = vi.fn();
      const computeMock = vi
        .fn()
        .mockReturnValue({ x: 0, y: 0, shiftX: 0, shiftY: 0 });
      vi.spyOn(updatePosition, "flipIfNeeded").mockImplementation(flipMock);
      vi.spyOn(updatePosition, "computePosition").mockImplementation(
        computeMock,
      );

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

      render(<TestComponent mode="always-open" position="bottom" />);

      expect(flipMock).toHaveBeenCalled();
      expect(computeMock).toHaveBeenCalled();

      // flipMock과 computeMock을 초기화하고 trigger 요소의 크기를 변경한다.
      flipMock.mockClear();
      computeMock.mockClear();

      act(() => {
        triggerResize?.();
      });

      expect(flipMock).toHaveBeenCalled();
      expect(computeMock).toHaveBeenCalled();
    });

    describe("top/bottom", () => {
      it("should flip top to bottom when there is not enough space", () => {
        // 위쪽은 기본적으로 공간이 부족하다.
        // top→bottom flip, offset=0: naturalX=0, y=triggerBottom(16)+0=16, shiftX=0 → x=0, y=16
        const { tooltip, arrow } = renderAndHover("top");

        checkTooltipPosition(tooltip, 0, 16);
        checkArrowPosition(arrow, "bottom");
      });

      it("should shiftX if tooltip overflows on the viewport", () => {
        // offset값을 주면 shift가 필요해진다.
        // top→bottom flip, offset=16: naturalX=0, y=16+16=32, shiftX=16-0=16 → x=16, y=32
        const { tooltip, arrow } = renderAndHover("top", 16);

        checkTooltipPosition(tooltip, 16, 32);
        checkArrowPosition(arrow, "bottom", 16);
      });
    });

    describe("left/right", () => {
      it("should flip left to right when there is not enough space", () => {
        // 왼쪽은 기본적으로 공간이 부족하다.
        // left→right flip, offset=0: x=triggerRight(36)+0=36, naturalY=0, shiftY=0 → x=36, y=0
        const { tooltip, arrow } = renderAndHover("left");

        checkTooltipPosition(tooltip, 36, 0);
        checkArrowPosition(arrow, "right");
      });

      it("should shiftY if tooltip overflows on the viewport", () => {
        // offset값을 주면 shift가 필요해진다.
        // left→right flip, offset=16: x=36+16=52, naturalY=0, shiftY=16-0=16 → x=52, y=16
        const { tooltip, arrow } = renderAndHover("left", 16);

        checkTooltipPosition(tooltip, 52, 16);
        checkArrowPosition(arrow, "right", 16);
      });
    });
  });

  describe("offset", () => {
    it("should apply the offset prop correctly", () => {
      // bottom, offset=32: naturalX=0, y=16+32=48, shiftX=32-0=32 → x=32, y=48
      const { tooltip, arrow } = renderAndHover("bottom", 32);

      checkTooltipPosition(tooltip, 32, 48);
      checkArrowPosition(arrow, "bottom", 32);
    });
  });
});
