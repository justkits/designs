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
}

export function ThemeProvider({ children }: Readonly<Props>) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (mode === "system") {
      applyTheme(getSystemTheme());
    } else {
      // 그렇지 않다면, 지정한 모드로 고정
      applyTheme(mode);
    }
  }, [mode]);

  useEffect(() => {
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
