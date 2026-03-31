import { type ReactNode, useCallback, useMemo, useRef, useState } from "react";

import { useKeyboardEvent } from "@/core/keyboard/useKeyboardEvent";
import { useOpenState } from "@/core/states/useOpenState";
import { useTimer } from "@/core/timer/useTimer";
import { type SwipeDirection } from "@/core/touch/types";
import { useSwipe } from "@/core/touch/useSwipe";
import { ToastContext } from "./internals/contexts";

const DEFAULT_SWIPE_DIRECTIONS: SwipeDirection[] = ["left", "right", "up"];

type ToastProviderProps = {
  children: ReactNode;
  portal?: boolean;
  duration?: number | "infinite";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  swipeDirection?: SwipeDirection[];
  swipeThreshold?: number;
};

export function ToastProvider({
  children,
  portal = false,
  duration = 5000,
  isOpen: controlledOpen,
  onOpenChange,
  swipeDirection = DEFAULT_SWIPE_DIRECTIONS,
  swipeThreshold = 50,
}: Readonly<ToastProviderProps>) {
  const {
    isOpen,
    show: showToast,
    hide: dismissToast,
  } = useOpenState(controlledOpen, onOpenChange, false);
  const { resumeTimer, pauseTimer } = useTimer(dismissToast, duration, isOpen);
  const [isPending, setPending] = useState(false);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  // 포커스가 Toast.Content 내부에 있을 때 Escape 키를 누르면 토스트가 닫힌다.
  const handleEscape = useCallback(() => {
    if (floatingRef.current?.contains(document.activeElement)) {
      dismissToast();
    }
  }, [dismissToast]);
  useKeyboardEvent("Escape", handleEscape, isOpen);
  useSwipe(floatingRef, dismissToast, swipeDirection, swipeThreshold, isOpen);

  const contextValue = useMemo(
    () => ({
      isOpen,
      isPortalMode: portal,
      showToast: () => showToast(), // 항상 delay 없이 즉시 토스트가 열리도록 한다.
      dismissToast: () => dismissToast(),
      resumeTimer,
      pauseTimer,
      isPending,
      setPending,
      floatingRef,
    }),
    [
      isOpen,
      portal,
      showToast,
      dismissToast,
      resumeTimer,
      pauseTimer,
      isPending,
    ],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}
