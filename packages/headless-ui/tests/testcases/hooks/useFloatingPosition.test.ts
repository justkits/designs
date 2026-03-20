import { act, renderHook } from "@testing-library/react";

import { useFloatingPosition } from "@/_hooks/useFloatingPosition";

describe("useFloatingPosition - cornercases", () => {
  it("no trigger rect", () => {
    const { result } = renderHook(() =>
      useFloatingPosition({ current: null }, { current: null }, "top"),
    );

    act(() => {
      result.current.updatePosition();
    });

    expect(result.current.placement).toBe("top");
  });

  it("no floating rect", () => {
    const trigger = document.createElement("button");
    const { result } = renderHook(() =>
      useFloatingPosition({ current: trigger }, { current: null }, "top"),
    );

    act(() => {
      result.current.updatePosition();
    });

    expect(result.current.placement).toBe("top");
  });
});
