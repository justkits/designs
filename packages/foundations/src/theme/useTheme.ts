"use client";

import { createContext, useContext } from "react";

import { ThemeMode } from "./types";

interface ThemeContextValue {
  mode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * 테마 컨텍스트 훅
 * 현재 테마 모드 (system/light/dark)와 설정 변경 함수를 사용할 수 있음
 * @returns
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
