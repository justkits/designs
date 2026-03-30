import { fireEvent, render } from "@testing-library/react";

import { AlwaysOpenTestComponent, checkArrowPosition } from "./_setup";

describe("Popover - corner cases", () => {
  describe("positions - flip and shift cases", () => {
    // options.test.tsx에서는 아래 4가지 경우만 테스트한다. 따라서, 나머지 케이스들을 전부 처리해야한다.
    // 1. top -> bottom flip
    // 2. left -> right flip
    // 3. top|bottom 일 때 왼쪽으로 shift
    // 4. left|right 일 때 아래로 shift

    beforeEach(() => {
      vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
      vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);

      // 아래쪽과 오른쪽에 공간이 없도록 세팅한다. (offset만 줘도 공간이 부족하다.)
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 580,
        bottom: 600,
        left: 780,
        right: 800,
        width: 20,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("flips bottom -> top and shifts left (negative shiftX)", () => {
      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="bottom" />,
      );

      const trigger = getByTestId("popover-trigger");
      fireEvent.click(trigger);

      const content = getByTestId("popover-content");
      expect(content.style.top).toBe("544px");
      expect(content.style.left).toBe("764px");

      const arrow = getByTestId("popover-arrow");
      checkArrowPosition(arrow, "top", -16);
    });

    it("flips right -> left and shifts up (negative shiftY)", () => {
      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="right" />,
      );

      const trigger = getByTestId("popover-trigger");
      fireEvent.click(trigger);

      const content = getByTestId("popover-content");
      expect(content.style.top).toBe("564px");
      expect(content.style.left).toBe("744px");

      const arrow = getByTestId("popover-arrow");
      checkArrowPosition(arrow, "left", -16);
    });
  });

  describe("positions - no flip or shift needed", () => {
    beforeEach(() => {
      vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
      vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);

      // 어느 방향으로 렌더링해도 충분한 공간이 있도록 세팅한다.
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 200,
        bottom: 220,
        left: 200,
        right: 220,
        width: 20,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("renders bottom without shift (sufficient space)", () => {
      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="bottom" />,
      );

      const trigger = getByTestId("popover-trigger");
      fireEvent.click(trigger);

      const content = getByTestId("popover-content");
      expect(content.style.top).toBe("236px");
      expect(content.style.left).toBe("200px");

      const arrow = getByTestId("popover-arrow");
      checkArrowPosition(arrow, "bottom");
    });
  });
});
