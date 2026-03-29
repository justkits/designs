import { type RefObject, useCallback, useLayoutEffect, useState } from "react";

import { type FloatingPlacement } from "./types";
import { computePosition, flipIfNeeded } from "./updatePosition";

/**
 * Trigger 요소를 기준으로 렌더링되는 Floating 요소의 위치를 계산하는 훅.
 *  - 화면을 벗어날 것 같으면 자동으로 위치를 반전시키고, 화면 가장자리와 겹치지 않도록 shift 값을 계산한다.
 *   - "top"이나 "bottom"인 경우, 위 아래 공간이 부족하면 flip, 좌우 공간이 부족하면 shiftX를 수행하고,
 *   - "left"이나 "right"인 경우, 좌우 공간이 부족하면 flip, 위 아래 공간이 부족하면 shiftY를 수행한다.
 *  - Trigger나 Floating 요소의 크기가 변경되거나, 화면이 리사이즈되거나 스크롤될 때 위치를 자동으로 재계산한다.
 * @param triggerRef - 위치 계산의 기준이 되는 요소의 ref
 * @param floatingRef - 위치 계산의 대상이 되는 요소의 ref
 * @param defaultPlacement - 요소가 기본적으로 위치할 방향. "top" | "bottom" | "left" | "right"
 * @param isOpen - Floating 요소가 열려 있는지 여부
 * @param offset - Trigger 요소와 뷰포트 가장자리로부터의 최소 간격 (기본값: 16)
 * @returns { placement, x, y, shiftX, shiftY } - 계산된 위치 정보
 */
export function useFloatingPosition(
  triggerRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>,
  defaultPlacement: FloatingPlacement,
  isOpen: boolean = false,
  offset: number = 16,
) {
  const [placement, setPlacement] =
    useState<FloatingPlacement>(defaultPlacement);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [shiftX, setShiftX] = useState<number>(0);
  const [shiftY, setShiftY] = useState<number>(0);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !floatingRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const elementRect = floatingRef.current.getBoundingClientRect();

    const newPlacement = flipIfNeeded(
      triggerRect,
      elementRect,
      defaultPlacement,
      offset,
    );
    setPlacement(newPlacement);

    const { x, y, shiftX, shiftY } = computePosition(
      triggerRect,
      elementRect,
      newPlacement,
      offset,
    );
    setX(x);
    setY(y);
    setShiftX(shiftX);
    setShiftY(shiftY);
  }, [defaultPlacement, triggerRef, floatingRef, offset]);

  // Trigger나 Floating 요소의 크기가 변경되면 자동으로 재계산한다.
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !floatingRef.current) return;

    const observer = new ResizeObserver(() => {
      updatePosition();
    });

    observer.observe(triggerRef.current);
    observer.observe(floatingRef.current);

    return () => observer.disconnect();
  }, [isOpen, updatePosition, triggerRef, floatingRef]);

  // 화면이 리사이즈되거나 스크롤될 때 위치를 자동으로 재계산한다.
  // 추가로, isOpen이 false에서 true로 변경될 때도 위치를 계산한다.
  useLayoutEffect(() => {
    if (!isOpen) return;

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  return { placement, x, y, shiftX, shiftY };
}
