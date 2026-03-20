import { act, renderHook } from "@testing-library/react";

import { useFloatingPosition } from "@/_hooks/useFloatingPosition";

describe("useFloatingPosition - cornercases", () => {
  it("no wrapper rect", () => {
    const { result } = renderHook(() =>
      useFloatingPosition({ current: null }, "top"),
    );

    act(() => {
      result.current.updatePosition();
    });

    expect(result.current.placement).toBe("top");
  });

  it("no element rect", () => {
    const div = document.createElement("div");
    const { result } = renderHook(() =>
      useFloatingPosition({ current: div }, "top"),
    );

    act(() => {
      result.current.updatePosition();
    });

    expect(result.current.placement).toBe("top");
  });
});
