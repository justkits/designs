import { act, renderHook } from "@testing-library/react";

import { useAnimatedExit } from "@/transition/useAnimatedExit";

describe("useAnimatedExit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("handles startClosing correctly", async () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    // 처음에는 exiting이 false여야 한다.
    expect(result.current.exiting).toBe(false);

    // startClosing을 호출하면 exiting이 true로 바뀌어야 한다.
    act(() => result.current.startClosing());
    expect(result.current.exiting).toBe(true);

    // exiting이 끝나지 않았다면, onClose가 호출되지 않아야 한다.
    await act(async () => vi.advanceTimersByTime(200));
    expect(onClose).not.toHaveBeenCalled();

    // 또한, exiting 중 startClosing을 다시 호출해도 아무런 효과가 없어야 한다.
    act(() => result.current.startClosing());
    expect(result.current.exiting).toBe(true);
    expect(onClose).not.toHaveBeenCalled();

    // 애니메이션이 끝나면 exiting이 false로 돌아오고, onClose가 호출되어야 한다.
    await act(async () => vi.advanceTimersByTime(200));
    expect(onClose).toHaveBeenCalledOnce();
    expect(result.current.exiting).toBe(false);
  });

  it("respects preset duration string value", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit("fast", onClose));

    act(() => result.current.startClosing());
    act(() => vi.advanceTimersByTime(399));
    expect(onClose).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("respects reduced motion preference", async () => {
    vi.spyOn(globalThis.window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: true,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => result.current.startClosing());
    // with reduced motion, duration collapses to 0ms — onClose fires immediately
    await act(async () => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledOnce();

    vi.restoreAllMocks();
  });
});
