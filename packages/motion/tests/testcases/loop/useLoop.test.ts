import { act, renderHook } from "@testing-library/react";

import { useLoop } from "@/loop/useLoop";

describe("useLoop", () => {
  it("returns isLooping and 2 callbacks", () => {
    const { result } = renderHook(() => useLoop());

    expect(result.current).toHaveProperty("isLooping", false);
    expect(result.current).toHaveProperty("startAnimation");
    expect(result.current).toHaveProperty("stopAnimation");
  });

  it("handles startAnimation and stopAnimation correctly", () => {
    const { result } = renderHook(() => useLoop());

    act(() => result.current.startAnimation());
    expect(result.current.isLooping).toBe(true);

    act(() => result.current.stopAnimation());
    expect(result.current.isLooping).toBe(false);
  });
});
