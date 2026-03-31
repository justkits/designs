import { type RefObject, useEffect } from "react";

import { type SwipeDirection } from "./types";

/**
 * 주어진 ref 요소에서 스와이프가 감지되면 callback이 호출되는 훅.
 *  - isActive가 false인 경우, 훅이 비활성화되어 콜백이 호출되지 않는다.
 * @param ref - 감시할 요소의 ref
 * @param callback - 스와이프가 감지되었을 때 호출되는 콜백 함수
 * @param directions - 감지할 스와이프 방향 목록
 * @param threshold - 스와이프로 간주하기 위한 최소 이동 거리(px)
 * @param isActive - 훅의 활성화 여부. 기본값 true
 */
export function useSwipe(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  directions: SwipeDirection[],
  threshold: number,
  isActive: boolean = true,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !isActive) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      const matched = directions.some(
        (dir) =>
          (dir === "right" && deltaX >= threshold) ||
          (dir === "left" && deltaX <= -threshold) ||
          (dir === "down" && deltaY >= threshold) ||
          (dir === "up" && deltaY <= -threshold),
      );

      if (matched) callback();
    };

    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref, callback, directions, threshold, isActive]);
}
