import { RefObject, useEffect } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  );
}

/**
 * 팝오버/다이얼로그 등에서 포커스를 관리하는 훅.
 *
 * - **자동 포커스**: `isActive`가 true가 되면 컨테이너 내 첫 번째 포커스 가능 요소로 포커스를 이동한다.
 * - **포커스 가두기**: Tab / Shift+Tab이 컨테이너 밖으로 나가지 않도록 순환시킨다.
 * - **포커스 복귀**: `isActive`가 false가 되면 트리거 요소로 포커스를 돌려준다.
 */
export function useFocusTrap(
  floatingRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  // Auto-focus + focus return
  useEffect(() => {
    if (!isActive || !floatingRef.current) return;

    const focusables = getFocusableElements(floatingRef.current);
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      floatingRef.current.focus();
    }

    const trigger = triggerRef.current;
    return () => {
      trigger?.focus();
    };
  }, [isActive, floatingRef, triggerRef]);

  // Focus trap (Tab cycling)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !floatingRef.current) return;
      if (!floatingRef.current.contains(document.activeElement)) return;

      const focusables = getFocusableElements(floatingRef.current);
      if (focusables.length === 0) {
        e.preventDefault();
        floatingRef.current.focus();
        return;
      }

      const [first] = focusables;
      const last = focusables.at(-1)!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, floatingRef]);
}
