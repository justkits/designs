import { createContext, useContext } from "react";

import type { Mode, Theme } from "./types";

interface ThemeContextValue {
  mode: Mode;
  selectMode: (mode: Mode) => void;
  resolvedTheme: Theme;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
