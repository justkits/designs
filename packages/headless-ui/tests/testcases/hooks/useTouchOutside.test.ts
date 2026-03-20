import { renderHook } from "@testing-library/react";

import { useTouchOutside } from "@/_hooks/useTouchOutside";

describe("useTouchOutside - cornercases", () => {
  it("does not call callback when ref is null", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ ref, isActive }) => useTouchOutside(ref, callback, isActive),
      { initialProps: { ref: { current: null }, isActive: true } },
    );

    document.dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));
    expect(callback).not.toHaveBeenCalled();

    rerender({ ref: { current: null }, isActive: false });
    document.dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));
    expect(callback).not.toHaveBeenCalled();
  });
});
