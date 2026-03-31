import { useCallback, useEffect, useRef } from "react";

export function useTimer(
  callback: () => void,
  duration: number | "infinite",
  startFlag: boolean,
) {
  const remainingRef = useRef<number | "infinite">(duration);
  const startedAtRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const resumeTimer = useCallback(() => {
    if (remainingRef.current === "infinite" || remainingRef.current <= 0)
      return;
    if (timerRef.current) return; // 타이머가 이미 실행 중이면, 중복해서 시작하지 않는다.

    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(
      () => callbackRef.current(),
      remainingRef.current,
    );
  }, []); // stable — reads callback via ref at fire time

  const pauseTimer = useCallback(() => {
    if (remainingRef.current === "infinite") return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (startedAtRef.current !== null) {
      remainingRef.current -= Date.now() - startedAtRef.current;
      startedAtRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    remainingRef.current = duration;
    startedAtRef.current = null;
  }, [duration]);

  useEffect(() => {
    if (duration === "infinite" || duration <= 0) return;

    if (startFlag) {
      // startFlag가 true로 바뀌면, 타이머를 시작한다. (시작 = 리셋 + 재개)
      resetTimer();
      resumeTimer();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, resetTimer, resumeTimer, startFlag]);

  return { pauseTimer, resumeTimer };
}
