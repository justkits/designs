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

  it("respects preset duration string value", async () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit("fast", onClose));

    act(() => result.current.startClosing());
    act(() => vi.advanceTimersByTime(399));
    expect(onClose).not.toHaveBeenCalled();

    await act(async () => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("works without an onClose callback", async () => {
    const { result } = renderHook(() => useAnimatedExit(400));

    act(() => result.current.startClosing());
    expect(result.current.exiting).toBe(true);

    await act(async () => vi.advanceTimersByTime(400));
    expect(result.current.exiting).toBe(false);
  });

  it("clears the timer on unmount and does not call onClose", async () => {
    const onClose = vi.fn();
    const { result, unmount } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => result.current.startClosing());
    expect(result.current.exiting).toBe(true);

    unmount();

    await act(async () => vi.advanceTimersByTime(400));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls the latest onClose when it changes between renders", async () => {
    const onClose1 = vi.fn();
    const onClose2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ onClose }) => useAnimatedExit(400, onClose),
      { initialProps: { onClose: onClose1 } },
    );

    rerender({ onClose: onClose2 });

    act(() => result.current.startClosing());
    await act(async () => vi.advanceTimersByTime(400));

    expect(onClose1).not.toHaveBeenCalled();
    expect(onClose2).toHaveBeenCalledOnce();
  });

  it("does not update state when component unmounts during onClose", async () => {
    let unmountFn: () => void = () => {};
    const onClose = vi.fn().mockImplementation(() => {
      unmountFn();
    });

    const { result, unmount } = renderHook(() => useAnimatedExit(400, onClose));
    unmountFn = unmount;

    act(() => result.current.startClosing());
    await act(async () => vi.advanceTimersByTime(400));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("logs error in dev when onClose throws", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = new Error("close failed");
    const onClose = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => result.current.startClosing());
    await act(async () => vi.advanceTimersByTime(400));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[useAnimatedExit] onClose threw an error:",
      error,
    );
    expect(result.current.exiting).toBe(false);

    vi.restoreAllMocks();
  });

  it("does not log error in production when onClose throws", async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const onClose = vi.fn().mockRejectedValue(new Error("close failed"));

    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => result.current.startClosing());
    await act(async () => vi.advanceTimersByTime(400));

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(result.current.exiting).toBe(false);

    process.env.NODE_ENV = originalEnv;
    vi.restoreAllMocks();
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
