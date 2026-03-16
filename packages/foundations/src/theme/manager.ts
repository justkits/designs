import { ResolvedTheme, ThemeMode } from "./types";

//#region ==================== 로컬 스토리지 관련 ==================== //

export const STORAGE_KEY = "theme-mode";

function loadStoredMode(): ThemeMode {
  if (globalThis.window === undefined) return "system";

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "system" || stored === "light" || stored === "dark") {
    return stored;
  }

  return "system";
}

function saveStoredMode(mode: ThemeMode): void {
  if (globalThis.window === undefined) return;

  localStorage.setItem(STORAGE_KEY, mode);
}

//#endregion

//#region ==================== 시스템 설정 관련 ==================== //

export function getSystemTheme(): ResolvedTheme {
  if (globalThis.window === undefined) {
    return "light";
  }
  return globalThis.window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function subscribeToSystemTheme(
  callback: (theme: ResolvedTheme) => void,
): (() => void) | undefined {
  if (globalThis.window === undefined) {
    return undefined;
  }

  const mediaQuery = globalThis.window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  const handleChange = (e: MediaQueryListEvent) => {
    const newTheme: ResolvedTheme = e.matches ? "dark" : "light";
    callback(newTheme);
  };

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
}

//#endregion

//#region ==================== 테마 모드 상태 관리 ==================== //

let _mode: ThemeMode = loadStoredMode(); // SSR-safe: window 없으면 "system" 반환
const _listeners = new Set<() => void>();

export function subscribe(listener: () => void): () => void {
  _listeners.add(listener);
  return () => {
    _listeners.delete(listener);
  };
}

export function getSnapshot(): ThemeMode {
  return _mode;
}

export function getServerSnapshot(): ThemeMode {
  return "system";
}

export function setMode(mode: ThemeMode): void {
  _mode = mode;
  saveStoredMode(mode);
  [..._listeners].forEach((listener) => listener());
}

//#endregion
