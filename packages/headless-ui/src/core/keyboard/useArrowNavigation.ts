import { type RefObject, useEffect } from "react";

import { getFocusableElements } from "./_utils";

/**
 * 주어진 target 요소 내부에서 ArrowDown / ArrowUp 키를 이용한 포커스 이동을 지원하는 훅.
 *  - ArrowDown: 다음 요소로 포커스 이동 (마지막 요소에서 첫 번째 요소로 순환)
 *  - ArrowUp: 이전 요소로 포커스 이동 (첫 번째 요소에서 마지막 요소로 순환)
 *  - Home: 첫 번째 요소로 포커스 이동
 *  - End: 마지막 요소로 포커스 이동
 * @param targetRef 포커스 이동 대상 요소의 Ref
 * @param isActive 훅의 활성화 여부
 */
export function useArrowNavigation(
  targetRef: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!targetRef.current) return;
      if (!targetRef.current.contains(document.activeElement)) return;

      const key = e.key;
      if (
        key !== "ArrowDown" &&
        key !== "ArrowUp" &&
        key !== "Home" &&
        key !== "End"
      )
        return;

      e.preventDefault();

      const focusables = getFocusableElements(targetRef.current);
      if (focusables.length === 0) return;

      const currentIndex = focusables.indexOf(
        document.activeElement as HTMLElement,
      );

      if (key === "Home") {
        focusables[0].focus();
        return;
      }

      if (key === "End") {
        focusables.at(-1)?.focus();
        return;
      }

      if (key === "ArrowDown") {
        const next =
          currentIndex === -1 || currentIndex === focusables.length - 1
            ? 0
            : currentIndex + 1;
        focusables[next].focus();
        return;
      }

      // 남은건 ArrowUp
      const prev = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
      focusables[prev].focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, targetRef]);
}
