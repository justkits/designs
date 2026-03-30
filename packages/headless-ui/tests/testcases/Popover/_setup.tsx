import { fireEvent, render } from "@testing-library/react";

import { Popover } from "@/Popover";
import { type FloatingPlacement } from "@/core/placement/types";

export function TestComponent({
  omit = undefined,
  portal = false,
  position,
  offset,
  onClose,
}: Readonly<{
  omit?: "trigger" | "overlay" | "content" | "button" | "title";
  portal?: boolean;
  position?: FloatingPlacement;
  offset?: number;
  onClose?: () => void | Promise<void>;
}>) {
  return (
    <>
      <Popover portal={portal} position={position} offset={offset}>
        {omit !== "trigger" && (
          <Popover.Trigger data-testid="popover-trigger">
            트리거
          </Popover.Trigger>
        )}
        {omit !== "content" && (
          <Popover.Content data-testid="popover-content">
            {omit !== "title" && (
              <Popover.Title data-testid="popover-title">
                팝오버 제목
              </Popover.Title>
            )}
            {omit !== "button" && (
              <Popover.Close data-testid="popover-button" onClick={onClose}>
                닫기
              </Popover.Close>
            )}
            <Popover.Arrow data-testid="popover-arrow" />
          </Popover.Content>
        )}
      </Popover>
      <div data-testid="outside-element">외부 요소</div>
    </>
  );
}

export function AlwaysOpenTestComponent({
  position,
  offset,
  portal = false,
}: Readonly<{
  position?: FloatingPlacement;
  offset?: number;
  portal?: boolean;
}>) {
  return (
    <Popover
      isOpen
      onOpenChange={() => {}}
      position={position}
      offset={offset}
      portal={portal}
    >
      <Popover.Trigger data-testid="popover-trigger">트리거</Popover.Trigger>
      <Popover.Content data-testid="popover-content">
        <Popover.Title data-testid="popover-title">팝오버 제목</Popover.Title>
        <Popover.Close data-testid="popover-button">닫기</Popover.Close>
        <Popover.Arrow data-testid="popover-arrow" />
      </Popover.Content>
    </Popover>
  );
}

export function renderAndClick(
  position: FloatingPlacement,
  offset: number = 0,
) {
  const { getByTestId } = render(
    <TestComponent position={position} offset={offset} />,
  );

  fireEvent.click(getByTestId("popover-trigger"));

  return {
    content: getByTestId("popover-content"),
    arrow: getByTestId("popover-arrow"),
  };
}

export function checkPopoverPosition(
  content: HTMLElement,
  expectedX: number,
  expectedY: number,
) {
  expect(content.style.position).toBe("fixed");
  expect(content.style.left).toBe(`${expectedX}px`);
  expect(content.style.top).toBe(`${expectedY}px`);
}

export function checkArrowPosition(
  arrow: HTMLElement,
  expectedPosition: string,
  offset: number = 0,
) {
  if (expectedPosition === "top") {
    expect(arrow.style.bottom).toBe("0px");
    expect(arrow.style.left).toBe("50%");
    expect(arrow.style.marginBottom).toBe("-4px");
    expect(arrow.style.transform).toBe(
      `translateX(calc(-50% - ${offset}px)) translateY(0px) rotate(45deg)`,
    );
  } else if (expectedPosition === "bottom") {
    expect(arrow.style.top).toBe("0px");
    expect(arrow.style.left).toBe("50%");
    expect(arrow.style.marginTop).toBe("-4px");
    expect(arrow.style.transform).toBe(
      `translateX(calc(-50% - ${offset}px)) translateY(0px) rotate(45deg)`,
    );
  } else if (expectedPosition === "left") {
    expect(arrow.style.right).toBe("0px");
    expect(arrow.style.top).toBe("50%");
    expect(arrow.style.marginRight).toBe("-8px");
    expect(arrow.style.transform).toBe(
      `translateX(0px) translateY(calc(-50% - ${offset}px))`,
    );
  } else {
    expect(arrow.style.left).toBe("0px");
    expect(arrow.style.top).toBe("50%");
    expect(arrow.style.marginLeft).toBe("-8px");
    expect(arrow.style.transform).toBe(
      `translateX(0px) translateY(calc(-50% - ${offset}px)) rotate(180deg)`,
    );
  }
}
