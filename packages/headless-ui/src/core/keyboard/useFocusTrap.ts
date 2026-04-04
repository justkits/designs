import { type RefObject, useEffect } from "react";

import { getFocusableElements } from "./_utils";

/**
 * 주어진 target 요소 내부로 Focus를 가두는 훅.
 *  - target 내부에서 Tab 키를 이용한 포커스 이동이 무한 루프를 돌도록 한다.
 * @param targetRef Focus를 가둘 target 요소의 Ref
 * @param isOpen Focus Trap의 활성화 여부
 * @returns void
 */
export function useFocusTrap(
  targetRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
) {
  // Focus trap (Tab cycling)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !targetRef.current) return;
      if (!targetRef.current.contains(document.activeElement)) return;

      const focusables = getFocusableElements(targetRef.current);

      if (focusables.length === 0) {
        e.preventDefault();
        targetRef.current.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables.at(-1);

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, targetRef]);
}
