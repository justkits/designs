import { act, render } from "@testing-library/react";

import * as utils from "@/core/placement/utils";
import {
  AlwaysOpenTestComponent,
  checkArrowPosition,
  checkPopoverPosition,
  renderAndClick,
} from "./_setup";

describe("Popover - options", () => {
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

  describe("position", () => {
    it("should apply the correct default position (bottom)", () => {
      // bottom, offset=0: naturalX=0, y=triggerBottom(16)+0=16, shiftX=0 → x=0, y=16
      const { content, arrow } = renderAndClick("bottom");

      checkPopoverPosition(content, 0, 16);
      checkArrowPosition(arrow, "bottom");
    });

    it("should re-position the popover on window resize or scroll", () => {
      // computeFloatingPosition이 window resize나 scroll에도 적용되는지 테스트한다.
      const computeMock = vi.fn().mockReturnValue({
        placement: "bottom",
        x: 0,
        y: 0,
        shiftX: 0,
        shiftY: 0,
      });
      vi.spyOn(utils, "computeFloatingPosition").mockImplementation(
        computeMock,
      );

      render(<AlwaysOpenTestComponent position="bottom" />);

      expect(computeMock).toHaveBeenCalled();

      // computeMock을 초기화하고 window resize 이벤트를 발생시킨다.
      computeMock.mockClear();
      act(() => {
        globalThis.window.dispatchEvent(new Event("resize"));
      });

      expect(computeMock).toHaveBeenCalled();

      // computeMock을 초기화하고 window scroll 이벤트를 발생시킨다.
      computeMock.mockClear();
      act(() => {
        globalThis.window.dispatchEvent(new Event("scroll"));
      });

      expect(computeMock).toHaveBeenCalled();
    });

    it("should re-position the popover on trigger or content resize", () => {
      // computeFloatingPosition이 trigger나 content의 resize에도 적용되는지 테스트한다.
      const computeMock = vi.fn().mockReturnValue({
        placement: "bottom",
        x: 0,
        y: 0,
        shiftX: 0,
        shiftY: 0,
      });
      vi.spyOn(utils, "computeFloatingPosition").mockImplementation(
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

      render(<AlwaysOpenTestComponent position="bottom" />);

      expect(computeMock).toHaveBeenCalled();

      // computeMock을 초기화하고 trigger 요소의 크기를 변경한다.
      computeMock.mockClear();

      act(() => {
        triggerResize?.();
      });

      expect(computeMock).toHaveBeenCalled();
    });

    describe("top/bottom", () => {
      it("should flip top to bottom when there is not enough space", () => {
        // 위쪽은 기본적으로 공간이 부족하다.
        // top→bottom flip, offset=0: naturalX=0, y=triggerBottom(16)+0=16, shiftX=0 → x=0, y=16
        const { content, arrow } = renderAndClick("top");

        checkPopoverPosition(content, 0, 16);
        checkArrowPosition(arrow, "bottom");
      });

      it("should shiftX if popover overflows on the viewport", () => {
        // offset값을 주면 shift가 필요해진다.
        // top→bottom flip, offset=16: naturalX=0, y=16+16=32, shiftX=16-0=16 → x=16, y=32
        const { content, arrow } = renderAndClick("top", 16);

        checkPopoverPosition(content, 16, 32);
        checkArrowPosition(arrow, "bottom", 16);
      });
    });

    describe("left/right", () => {
      it("should flip left to right when there is not enough space", () => {
        // 왼쪽은 기본적으로 공간이 부족하다.
        // left→right flip, offset=0: x=triggerRight(36)+0=36, naturalY=0, shiftY=0 → x=36, y=0
        const { content, arrow } = renderAndClick("left");

        checkPopoverPosition(content, 36, 0);
        checkArrowPosition(arrow, "right");
      });

      it("should shiftY if popover overflows on the viewport", () => {
        // offset값을 주면 shift가 필요해진다.
        // left→right flip, offset=16: x=36+16=52, naturalY=0, shiftY=16-0=16 → x=52, y=16
        const { content, arrow } = renderAndClick("left", 16);

        checkPopoverPosition(content, 52, 16);
        checkArrowPosition(arrow, "right", 16);
      });
    });
  });

  describe("offset", () => {
    it("should apply the offset prop correctly", () => {
      // bottom, offset=32: naturalX=0, y=16+32=48, shiftX=32-0=32 → x=32, y=48
      const { content, arrow } = renderAndClick("bottom", 32);

      checkPopoverPosition(content, 32, 48);
      checkArrowPosition(arrow, "bottom", 32);
    });
  });
});
