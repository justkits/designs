import { type RefObject, useEffect, useRef } from "react";

/**
 * 주어진 ref 요소를 길게 터치하면 callback이 호출되는 훅.
 *  - isActive가 false인 경우, 훅이 비활성화되어 콜백이 호출되지 않는다.
 * @param ref - 감시할 요소의 ref
 * @param callback - 요소가 길게 터치되었을 때 호출되는 콜백 함수
 * @param isActive - 훅의 활성화 여부. 기본값 true
 * @param threshold - 길게 터치로 간주하기 위한 터치 지속 시간. 기본값 500ms
 * @return void
 */
export function useLongTouch(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  threshold: number,
  isActive: boolean = true,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isActive) return;

    const clear = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onTouchStart = () => {
      timerRef.current = setTimeout(callback, threshold);
    };

    // passive 옵션을 사용하여 터치 이벤트의 기본 동작이 차단되지 않도록 설정
    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchend", clear);
    element.addEventListener("touchmove", clear);
    element.addEventListener("touchcancel", clear);

    return () => {
      clear();
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchend", clear);
      element.removeEventListener("touchmove", clear);
      element.removeEventListener("touchcancel", clear);
    };
  }, [ref, callback, threshold, isActive]);
}
