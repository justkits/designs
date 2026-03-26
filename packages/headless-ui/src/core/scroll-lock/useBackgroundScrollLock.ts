import { useEffect } from "react";

/**
 * `document.body`의 스크롤을 잠그는 훅.
 *  - `mounted`가 true가 되면 `overflow: hidden`을 설정하고
 *  - 언마운트 시 원래 값을 복원한다. (중첩 락이 부모의 overflow를 덮어쓰지 않도록)
 * @param isActive 스크롤 잠금 활성화 여부
 */
export function useBackgroundScrollLock(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isActive]);
}
