import type { Mode } from "./types";

export const STORAGE_KEY = "justkits-theme-mode";

export function loadUserPreference(
  defaultMode: Mode,
  withSystem: boolean,
): Mode {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (storedValue === "system" && withSystem) {
      return "system";
    } else if (storedValue === "light" || storedValue === "dark") {
      return storedValue;
    } else {
      return defaultMode;
    }
  } catch (e) {
    // localStorage is unavailable (e.g., in private mode / SSR)
    console.warn(`[JustKits Theme] Failed to load user preference: ${e}`);
    return defaultMode;
  }
}

export function saveUserPreference(value: Mode) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch (e) {
    // localStorage is unavailable (e.g., in private mode / SSR)
    console.warn(`[JustKits Theme] Failed to save user preference: ${e}`);
  }
}
