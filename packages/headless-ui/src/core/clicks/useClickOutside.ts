import { type RefObject, useEffect } from "react";

/**
 * 주어진 ref 요소 밖을 클릭하면 callback이 호출되는 훅.
 *  - isActive가 false인 경우, 훅이 비활성화되어 콜백이 호출되지 않는다.
 * @param ref - 감시할 요소의 ref
 * @param callback - 요소 밖이 클릭되었을 때 호출되는 콜백 함수
 * @param isActive - 훅의 활성화 여부. 기본값 true
 * @returns void
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  isActive: boolean = true,
) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    if (!isActive) return;

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isActive]);
}
