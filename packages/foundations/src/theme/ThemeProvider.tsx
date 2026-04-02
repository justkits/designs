"use client";

import {
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  getServerSnapshot,
  getSnapshot,
  getSystemTheme,
  setMode,
  subscribe,
  subscribeToSystemTheme,
} from "./manager";
import { ThemeContext } from "./useTheme";
import { ResolvedTheme } from "./types";
import "./theme.css";

interface Props {
  children: ReactNode;
}

/**
 * light-dark()로 선언해놓은 CSS 변수가 제대로 동작하도록 설정
 * @param targetResolved 적용할 테마 모드
 */
function applyTheme(targetResolved: ResolvedTheme) {
  // light-dark() 설정이 제대로 적용되도록
  document.documentElement.dataset.theme = targetResolved;
  // color-scheme 설정
  document.documentElement.style.colorScheme = targetResolved;
  document.documentElement.classList.add("theme-ready");
}

export function ThemeProvider({ children }: Readonly<Props>) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // 사용자가 시스템 모드를 따르도록 설정한 경우, 시스템 테마에 맞춰 적용
    if (mode === "system") {
      applyTheme(getSystemTheme());
    } else {
      // 그렇지 않다면, 지정한 모드로 고정
      applyTheme(mode);
    }

    // 시스템 테마 변경 구독 (사용자가 시스템 모드를 따르도록 설정한 경우에만)
    return subscribeToSystemTheme((theme) => {
      if (mode === "system") {
        applyTheme(theme);
      }
    });
  }, [mode]);

  const value = useMemo(() => ({ mode, setThemeMode: setMode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
