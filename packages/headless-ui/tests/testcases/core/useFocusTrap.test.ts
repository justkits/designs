import { renderHook } from "@testing-library/react";

import { useFocusTrap } from "@/core/keyboard/useFocusTrap";

describe("useFocusTrap - cornercases", () => {
  it("when Tab is pressed on a middle element", () => {
    // Tab 키가 중간 요소에서 눌렸을 때, 포커스 트랩이 작동하지 않아야 한다.
    // 다만, jsdom 환경에서는 Tab 키 이벤트가 실제로 포커스 이동을 일으키지 않기 때문에, preventDefault가 호출되지 않는지만 확인한다.
    const container = document.createElement("div");
    container.setAttribute("tabindex", "-1");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    container.append(btn1, btn2, btn3);
    document.body.appendChild(container);

    renderHook(() => useFocusTrap({ current: container }, true));

    btn2.focus();

    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    const spy = vi.spyOn(event, "preventDefault");
    document.dispatchEvent(event);

    expect(spy).not.toHaveBeenCalled();

    container.remove();
  });

  it("does not intercept Tab when focus is outside the container", () => {
    // useFocusTrap을 호출했을 때, Tab 키가 컨테이너 외부에서 눌렸다면, 포커스 트랩이 작동하지 않아야 한다.
    // 정상적인 동작에서는 발생하지 않겠지만, defensive programming 관점에서 보호 로직을 추가해두었다.
    // 따라서, cornercase를 만들어서 Tab 키가 눌렸을 때 preventDefault가 호출되지 않는지만 확인한다.
    const container = document.createElement("div");
    container.setAttribute("tabindex", "-1");
    const btn = document.createElement("button");
    container.appendChild(btn);
    document.body.appendChild(container);

    const outside = document.createElement("button");
    document.body.appendChild(outside);

    renderHook(() => useFocusTrap({ current: container }, true));

    outside.focus();

    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    const spy = vi.spyOn(event, "preventDefault");
    document.dispatchEvent(event);

    expect(spy).not.toHaveBeenCalled();

    container.remove();
    outside.remove();
  });
});
