import { useCallback, useEffect, useRef, useState } from "react";

import { AnimationDuration } from "@/tokens/duration";
import { useReducedMotion } from "@/utils/reduced-motion";
import { resolveDuration } from "./lib";

export function useAnimatedExit(
  duration: AnimationDuration,
  onClose?: () => void | Promise<void>,
) {
  const [exiting, setExiting] = useState<boolean>(false);
  const exitingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCloseRef = useRef(onClose);
  const mountedRef = useRef(true);
  const reducedMotion = useReducedMotion();

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      globalThis.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startClosing = useCallback(() => {
    if (exitingRef.current) return;

    exitingRef.current = true;
    setExiting(true);
    clearTimer();

    const durationMs = reducedMotion ? 0 : resolveDuration(duration);

    timerRef.current = globalThis.setTimeout(async () => {
      if (onCloseRef.current) {
        try {
          await onCloseRef.current();
        } catch (error) {
          if (process.env.NODE_ENV !== "production") {
            console.error("[useAnimatedExit] onClose threw an error:", error);
          }
        }
      }
      if (mountedRef.current) {
        exitingRef.current = false;
        setExiting(false);
      }
      clearTimer();
    }, durationMs);
  }, [duration, reducedMotion, clearTimer]);

  useEffect(() => {
    // Update onCloseRef in case it changes
    onCloseRef.current = onClose;

    // Cleanup on unmount
    return () => clearTimer();
  }, [onClose, clearTimer]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { exiting, startClosing };
}
