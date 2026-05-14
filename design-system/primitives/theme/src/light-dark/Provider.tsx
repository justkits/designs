import { useEffect, useCallback, useMemo, useState } from "react";

import { useSystemPreference } from "@/core/system";
import { ThemeContext } from "./context";
import { loadUserPreference, saveUserPreference } from "./storage";
import type { Theme, Mode } from "./types";

export type ThemeProps = {
  children: React.ReactNode;
} & (
  | { withSystem: true; defaultMode?: Mode }
  | { withSystem?: false; defaultMode?: Theme }
);

export function ThemeProvider({
  children,
  withSystem = false,
  defaultMode = withSystem ? "system" : "light",
}: Readonly<ThemeProps>) {
  const [mode, setMode] = useState<Mode>(
    loadUserPreference(defaultMode, withSystem),
  );
  const systemPreference = useSystemPreference();

  let resolvedTheme: Theme;
  if (mode === "system") {
    resolvedTheme = systemPreference;
  } else {
    resolvedTheme = mode;
  }

  useEffect(() => {
    document.documentElement.dataset.colorScheme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const selectMode = useCallback(
    (newMode: Mode) => {
      if (newMode === "system" && !withSystem) {
        console.warn(
          "System mode is not enabled. Please set withSystem to true to use system mode.",
        );
        return;
      }
      setMode(newMode);
      saveUserPreference(newMode);
    },
    [withSystem],
  );

  const contextValue = useMemo(
    () => ({ mode, selectMode, resolvedTheme }),
    [mode, selectMode, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
