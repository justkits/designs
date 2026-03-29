import { act, fireEvent, render } from "@testing-library/react";

import { Tooltip } from "@/Tooltip";
import { setupTimer } from "../_setup";
import {
  checkArrowPosition,
  checkTooltipPosition,
  renderAndHover,
} from "./_setup";

describe("Tooltip - corner cases", () => {
  setupTimer();

  it("should handle hover and focus events correctly when trigger is rendered with `asChild`", () => {
    const { getByTestId } = render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button data-testid="trigger">Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content data-testid="content">Tooltip content</Tooltip.Content>
      </Tooltip>,
    );

    // Hover하고 delay가 지나면 Tooltip.Content가 보여야 한다.
    fireEvent.mouseEnter(getByTestId("trigger"));
    act(() => vi.advanceTimersByTime(300));
    expect(getByTestId("content")).toBeTruthy();

    // Hover Exit하고 delay가 지나면 Tooltip.Content가 사라져야 한다.
    fireEvent.mouseLeave(getByTestId("trigger"));
    act(() => vi.advanceTimersByTime(700));
    expect(() => getByTestId("content")).toThrow();

    // Focus하면 즉시 Tooltip.Content가 보여야 한다.
    act(() => getByTestId("trigger").focus());
    expect(getByTestId("content")).toBeTruthy();

    // Blur하면 즉시 Tooltip.Content가 사라져야 한다.
    act(() => getByTestId("trigger").blur());
    expect(() => getByTestId("content")).toThrow();
  });

  it("does not open tooltip when disabled with Tooltip.Trigger asChild", () => {
    const { getByTestId, queryByTestId } = render(
      <Tooltip disabled>
        <Tooltip.Trigger asChild>
          <button data-testid="trigger">Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content data-testid="content">Tooltip content</Tooltip.Content>
      </Tooltip>,
    );

    expect(queryByTestId("content")).toBeNull();

    fireEvent.mouseOver(getByTestId("trigger"));
    act(() => vi.advanceTimersByTime(300));
    expect(queryByTestId("content")).toBeNull();
  });

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

    it("flips bottom -> top and shifts left (negavite shiftX)", () => {
      // bottom→top flip, offset=16: naturalX=780+10-10=780, y=580-20-16=544
      // shiftX: 780+20=800 > 800-16=784 → shiftX=784-20-780=-16 → x=764, y=544
      const { tooltip, arrow } = renderAndHover("bottom", 16);

      checkTooltipPosition(tooltip, 764, 544);
      checkArrowPosition(arrow, "top", -16);
    });

    it("flips right -> left and shifts up (negavite shiftY)", () => {
      // right→left flip, offset=16: x=780-20-16=744, naturalY=580+10-10=580
      // shiftY: 580+20=600 > 600-16=584 → shiftY=584-20-580=-16 → x=744, y=564
      const { tooltip, arrow } = renderAndHover("right", 16);

      checkTooltipPosition(tooltip, 744, 564);
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

    it("renders bottom without flip or shift", () => {
      // bottom, offset=16: naturalX=200+10-10=200, y=220+16=236, shiftX=0 → x=200, y=236
      const { tooltip, arrow } = renderAndHover("bottom", 16);

      checkTooltipPosition(tooltip, 200, 236);
      checkArrowPosition(arrow, "bottom", 0);
    });

    it("renders top without flip or shift", () => {
      // top, offset=16: naturalX=200, y=200-20-16=164, shiftX=0 → x=200, y=164
      const { tooltip, arrow } = renderAndHover("top", 16);

      checkTooltipPosition(tooltip, 200, 164);
      checkArrowPosition(arrow, "top", 0);
    });

    it("renders right without flip or shift", () => {
      // right, offset=16: x=220+16=236, naturalY=200+10-10=200, shiftY=0 → x=236, y=200
      const { tooltip, arrow } = renderAndHover("right", 16);

      checkTooltipPosition(tooltip, 236, 200);
      checkArrowPosition(arrow, "right", 0);
    });

    it("renders left without flip or shift", () => {
      // left, offset=16: x=200-20-16=164, naturalY=200, shiftY=0 → x=164, y=200
      const { tooltip, arrow } = renderAndHover("left", 16);

      checkTooltipPosition(tooltip, 164, 200);
      checkArrowPosition(arrow, "left", 0);
    });
  });
});
