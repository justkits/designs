import { renderHook } from "@testing-library/react";

import { useClickOutside } from "@/_hooks/useClickOutside";

describe("useClickOutside - cornercases", () => {
  it("does not call callback when ref is null", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ ref, isActive }) => useClickOutside(ref, callback, isActive),
      { initialProps: { ref: { current: null }, isActive: true } },
    );

    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(callback).not.toHaveBeenCalled();

    rerender({ ref: { current: null }, isActive: false });
    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(callback).not.toHaveBeenCalled();
  });
});
