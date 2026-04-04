import { type RefObject, useEffect } from "react";

import { getFocusableElements } from "./_utils";

/**
 * 주어진 target 요소 내부로 자동으로 Focus를 이동시키는 훅.
 *  - isOpen flag가 true가 되면, 자동으로 target 내부에 적절한 요소로 Focus를 이동시키고
 *  - isOpen flag가 false가 되면, Focus를 적절한 요소로 복귀시킨다.
 * @param targetRef Focus를 이동시킬 target 요소의 Ref
 * @param isOpen flag
 * @param triggerRef isOpen이 false가 되면, 이 요소로 Focus가 복귀된다. 지정하지 않으면, 자동으로 Focus가 이동하기 전의 요소로 Focus가 복귀된다.
 * @returns void
 */
export function useAutoFocus(
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
}
