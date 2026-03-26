import { RefObject, useEffect } from "react";

/**
 * 주어진 target 요소 내부로 Focus를 가두는 훅.
 *  - isOpen flag가 true가 되면, 자동으로 target 내부에 적절한 요소로 Focus를 이동시키고
 *  - 그렇지 않으면, Focus를 적절한 요소로 복귀시킨다.
 *  - target 내부에서 Tab 키를 이용한 포커스 이동이 무한 루프를 돌도록 한다.
 * @param targetRef Focus를 가둘 target 요소의 Ref
 * @param isOpen Focus Trap의 활성화 여부
 * @param triggerRef Focus Trap이 활성화될 때, Focus가 이동하기 전의 요소의 Ref. Focus Trap이 비활성화될 때, 이 요소로 Focus가 복귀된다. 지정하지 않으면, 자동으로 Focus가 이동하기 전의 요소로 Focus가 복귀된다.
 */
export function useFocusTrap(
  targetRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  triggerRef?: RefObject<HTMLElement | null>,
) {
  // Auto-focus + focus return
  useEffect(() => {
    if (!isOpen || !targetRef.current) return;

    const previousFocus =
      triggerRef?.current || (document.activeElement as HTMLElement | null);

    const focusables = getFocusableElements(targetRef.current);
    if (focusables.length > 0) {
      focusables[0].focus();
    } else {
      targetRef.current.focus();
    }

    return () => {
      previousFocus?.focus();
    };
  }, [isOpen, targetRef, triggerRef]);

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

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable]:not([contenteditable='false'])",
  "details > summary",
  "audio[controls]",
  "video[controls]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  );
}
