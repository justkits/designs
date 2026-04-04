import { renderHook } from "@testing-library/react";

import { useArrowNavigation } from "@/core/keyboard/useArrowNavigation";

function dispatchArrowKey(key: "ArrowDown" | "ArrowUp") {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}

describe("useArrowNavigation - corner cases", () => {
  it("does nothing when ref is null", () => {
    renderHook(() => useArrowNavigation({ current: null }, true));

    // Should not throw
    dispatchArrowKey("ArrowDown");
  });

  it("does nothing when focus is outside the container", () => {
    const container = document.createElement("div");
    const btn = document.createElement("button");
    container.appendChild(btn);
    document.body.appendChild(container);

    const outside = document.createElement("button");
    document.body.appendChild(outside);
    outside.focus();

    renderHook(() => useArrowNavigation({ current: container }, true));

    dispatchArrowKey("ArrowDown");

    expect(document.activeElement).toBe(outside);

    container.remove();
    outside.remove();
  });

  it("does nothing when container has no focusable elements", () => {
    const container = document.createElement("div");
    container.setAttribute("tabindex", "0");
    document.body.appendChild(container);
    container.focus();

    renderHook(() => useArrowNavigation({ current: container }, true));

    dispatchArrowKey("ArrowDown");

    expect(document.activeElement).toBe(container);

    container.remove();
  });

  it("ArrowDown wraps from last item to first", () => {
    const container = document.createElement("div");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    container.append(btn1, btn2, btn3);
    document.body.appendChild(container);
    btn3.focus();

    renderHook(() => useArrowNavigation({ current: container }, true));

    dispatchArrowKey("ArrowDown");

    expect(document.activeElement).toBe(btn1);

    container.remove();
  });

  it("ArrowDown goes to first when focus is on container (currentIndex === -1)", () => {
    const container = document.createElement("div");
    container.setAttribute("tabindex", "0");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    container.append(btn1, btn2);
    document.body.appendChild(container);
    container.focus(); // inside container, but not in focusables list

    renderHook(() => useArrowNavigation({ current: container }, true));

    dispatchArrowKey("ArrowDown");

    expect(document.activeElement).toBe(btn1);

    container.remove();
  });

  it("ArrowUp wraps from first item to last", () => {
    const container = document.createElement("div");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    container.append(btn1, btn2, btn3);
    document.body.appendChild(container);
    btn1.focus();

    renderHook(() => useArrowNavigation({ current: container }, true));

    dispatchArrowKey("ArrowUp");

    expect(document.activeElement).toBe(btn3);

    container.remove();
  });
});
