import { renderHook } from "@testing-library/react";

import { useOutsideInert } from "@/core/inert/useOutsideInert";

describe("useOutsideInert - cornercases", () => {
  it("does not throw when container is a direct child of <html>", () => {
    // useOutsideInert을 호출했을 때, container 요소가 <html>의 직접 자식 요소라면,
    // inert 속성을 적용할 외부 요소가 존재하지 않기 때문에, 예외가 발생하지 않아야 한다.
    // 정상적인 동작에서는 발생하지 않겠지만, defensive programming 관점에서 보호 로직을 추가해두었다.
    // 따라서, cornercase를 만들어서 coverage만 올린다.
    const container = document.createElement("div");
    const btn = document.createElement("button");
    container.appendChild(btn);
    document.documentElement.appendChild(container);

    renderHook(() => useOutsideInert({ current: container }, true));

    container.remove();
  });
});
