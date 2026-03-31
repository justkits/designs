import { fireEvent } from "@testing-library/react";

import { Toast } from "@/Toast";
import { type SwipeDirection } from "@/core/touch/types";

export function TestComponent({
  omit,
  isOpen,
  onClose,
  duration,
  portal = false,
  swipeDirection,
  swipeThreshold,
}: Readonly<{
  omit?: "trigger" | "content" | "message" | "close";
  isOpen?: boolean;
  onClose?: () => void | Promise<void>;
  duration?: number | "infinite";
  portal?: boolean;
  swipeDirection?: SwipeDirection[];
  swipeThreshold?: number;
}>) {
  return (
    <>
      <Toast
        isOpen={isOpen}
        portal={portal}
        duration={duration}
        swipeDirection={swipeDirection}
        swipeThreshold={swipeThreshold}
      >
        {omit !== "trigger" && (
          <Toast.Trigger data-testid="toast-trigger">트리거</Toast.Trigger>
        )}
        {omit !== "content" && (
          <Toast.Content data-testid="toast-content">
            {omit !== "message" && (
              <Toast.Message data-testid="toast-message">
                토스트 메시지
              </Toast.Message>
            )}
            {omit !== "close" && (
              <Toast.Close data-testid="toast-close" onClick={onClose}>
                닫기
              </Toast.Close>
            )}
          </Toast.Content>
        )}
      </Toast>
      <div data-testid="outside-element">
        <h3>외부 요소</h3>
        <button data-testid="outside-button">외부 버튼</button>
      </div>
    </>
  );
}

export function swipe(
  element: HTMLElement,
  direction: SwipeDirection,
  distance: number,
) {
  fireEvent.touchStart(element, {
    touches: [{ clientX: 0, clientY: 0 }],
  });

  if (direction === "left" || direction === "right") {
    fireEvent.touchEnd(element, {
      changedTouches: [
        { clientX: direction === "left" ? -distance : distance, clientY: 0 },
      ],
    });
  } else {
    fireEvent.touchEnd(element, {
      changedTouches: [
        { clientX: 0, clientY: direction === "up" ? -distance : distance },
      ],
    });
  }
}
