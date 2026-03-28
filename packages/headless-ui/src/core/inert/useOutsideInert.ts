import { type RefObject, useEffect } from "react";

/**
 * 주어진 컨테이너 요소 외부의 모든 요소에 inert 속성을 적용하는 훅.
 *  - 스크린 리더가 배경 콘텐츠를 읽지 않도록 설정
 *  - isActive가 false이거나 containerRef가 유효하지 않은 경우, 훅이 비활성화되어 아무런 요소에도 inert 속성이 적용되지 않는다.
 * @param containerRef inert 속성을 적용할 컨테이너 요소의 Ref
 * @param isActive 훅의 활성화 여부
 * @returns void
 */
export function useOutsideInert(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const outsideElements = getOutsideElements(containerRef.current);
    outsideElements.forEach((el) => el.setAttribute("inert", ""));

    return () => {
      outsideElements.forEach((el) => el.removeAttribute("inert"));
    };
  }, [isActive, containerRef]);
}

function getOutsideElements(element: HTMLElement): HTMLElement[] {
  const elements: HTMLElement[] = [];
  let current: HTMLElement | null = element;

  while (current !== null && current !== document.body) {
    const parent: HTMLElement | null = current.parentElement;
    if (parent) {
      for (const sibling of Array.from(parent.children)) {
        if (sibling !== current && sibling instanceof HTMLElement) {
          elements.push(sibling);
        }
      }
    }
    current = parent;
  }

  return elements;
}
