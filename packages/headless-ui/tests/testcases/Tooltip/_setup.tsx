import { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import { Tooltip } from "@/Tooltip";
import { type FloatingPlacement } from "@/core/placement/types";

export function TestComponent({
  mode = "uncontrolled",
  omit,
  portal = false,
  disabled = false,
  openDelay,
  closeDelay,
  longTouchDuration,
  position,
  offset,
}: Readonly<{
  mode?: "uncontrolled" | "controlled" | "always-open";
  omit?: "trigger" | "content" | "arrow" | "message";
  portal?: boolean;
  disabled?: boolean;
  openDelay?: number;
  closeDelay?: number;
  longTouchDuration?: number;
  position?: FloatingPlacement;
  offset?: number;
}>) {
  const [openState, setOpenState] = useState<boolean>(false);

  const isOpen = () => {
    if (mode === "always-open") return true;
    if (mode === "controlled") return openState;
    return undefined;
  };

  const onOpenChange = (open: boolean) => {
    if (mode === "controlled") {
      setOpenState(open);
    }
  };

  return (
    <Tooltip
      isOpen={isOpen()}
      onOpenChange={onOpenChange}
      portal={portal}
      disabled={disabled}
      openDelay={openDelay}
      closeDelay={closeDelay}
      longTouchDuration={longTouchDuration}
      position={position}
      offset={offset}
    >
      {omit !== "trigger" && (
        <Tooltip.Trigger data-testid="tooltip-trigger">트리거</Tooltip.Trigger>
      )}
      {omit !== "content" && (
        <Tooltip.Content data-testid="tooltip-content">
          {omit !== "message" && (
            <Tooltip.Message data-testid="tooltip-message">
              툴팁 메시지
            </Tooltip.Message>
          )}
          {omit !== "arrow" && <Tooltip.Arrow data-testid="tooltip-arrow" />}
        </Tooltip.Content>
      )}
    </Tooltip>
  );
}

export function renderAndHover(
  position: FloatingPlacement,
  offset: number = 0,
) {
  const { getByTestId } = render(
    <TestComponent position={position} offset={offset} />,
  );

  const trigger = getByTestId("tooltip-trigger");

  fireEvent.mouseEnter(trigger);
  act(() => vi.advanceTimersByTime(300));

  const tooltip = getByTestId("tooltip-content");
  const arrow = getByTestId("tooltip-arrow");

  return { tooltip, arrow };
}

export function checkTooltipPosition(
  tooltip: HTMLElement,
  expectedX: number,
  expectedY: number,
) {
  expect(tooltip.style.position).toBe("fixed");
  expect(tooltip.style.left).toBe(`${expectedX}px`);
  expect(tooltip.style.top).toBe(`${expectedY}px`);
}

export function checkArrowPosition(
  arrow: HTMLElement,
  expectedPosition: string,
  offset: number = 0,
) {
  if (expectedPosition === "top") {
    expect(arrow.style.bottom).toBe("0px"); // 화살표는 툴팁의 아래쪽에 위치
    expect(arrow.style.left).toBe("50%");
    expect(arrow.style.marginBottom).toBe("-4px");
    expect(arrow.style.transform).toBe(
      `translateX(calc(-50% - ${offset}px)) translateY(0px) rotate(45deg)`,
    ); // 화살표는 툴팁의 중앙에 위치
  } else if (expectedPosition === "bottom") {
    expect(arrow.style.top).toBe("0px"); // 화살표는 툴팁의 위쪽에 위치
    expect(arrow.style.left).toBe("50%");
    expect(arrow.style.marginTop).toBe("-4px");
    expect(arrow.style.transform).toBe(
      `translateX(calc(-50% - ${offset}px)) translateY(0px) rotate(45deg)`,
    ); // 화살표는 툴팁의 중앙에 위치
  } else if (expectedPosition === "left") {
    expect(arrow.style.right).toBe("0px"); // 화살표는 툴팁의 오른쪽에 위치
    expect(arrow.style.top).toBe("50%");
    expect(arrow.style.marginRight).toBe("-8px");
    expect(arrow.style.transform).toBe(
      `translateX(0px) translateY(calc(-50% - ${offset}px))`,
    ); // 화살표는 툴팁의 중앙에 위치
  } else {
    expect(arrow.style.left).toBe("0px"); // 화살표는 툴팁의 왼쪽에 위치
    expect(arrow.style.top).toBe("50%");
    expect(arrow.style.marginLeft).toBe("-8px");
    expect(arrow.style.transform).toBe(
      `translateX(0px) translateY(calc(-50% - ${offset}px)) rotate(180deg)`,
    ); // 화살표는 툴팁의 중앙에 위치
  }
}
