import { useEffect } from "react";

/**
 * 특정 키가 눌렸을 때 callback이 호출되는 훅.
 *  - isActive가 false인 경우, 훅이 비활성화되어 콜백이 호출되지 않는다.
 * @param key - 감시할 키 (예: "Escape", "Enter")
 * @param callback - 키가 눌렸을 때 호출되는 콜백 함수
 * @param isActive - 훅의 활성화 여부. 기본값 true
 */
export function useKeyboardEvent(
  key: string,
  callback: () => void,
  isActive: boolean = true,
) {
  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };

    globalThis.addEventListener("keydown", onKeyDown);

    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [key, callback, isActive]);
}
