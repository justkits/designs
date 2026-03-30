import { type RefObject, useEffect } from "react";

/**
 * 주어진 ref 요소 밖을 클릭하면 callback이 호출되는 훅.
 *  - isActive가 false인 경우, 훅이 비활성화되어 콜백이 호출되지 않는다.
 *  - excludeRef가 주어진 경우, 해당 요소를 클릭해도 콜백이 호출되지 않는다.
 * @param ref - 감시할 요소의 ref
 * @param callback - 요소 밖이 클릭되었을 때 호출되는 콜백 함수
 * @param isActive - 훅의 활성화 여부. 기본값 true
 * @param excludeRef - 클릭을 무시할 요소의 ref (선택)
 * @returns void
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  isActive: boolean = true,
  excludeRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !excludeRef?.current?.contains(target)
      ) {
        callback();
      }
    };

    if (!isActive) return;

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isActive, excludeRef]);
}
