import { useTheme } from "@/light-dark";

// #region mocks
export function mockMatchMedia({ preferDark }: { preferDark?: boolean } = {}) {
  let changeListener: ((e: MediaQueryListEvent) => void) | null = null;

  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: preferDark && query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (
        _event: string,
        listener: (e: MediaQueryListEvent) => void,
      ) => {
        changeListener = listener;
      },
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  return {
    simulateChange: (prefersDark: boolean) => {
      changeListener?.({ matches: prefersDark } as MediaQueryListEvent);
    },
  };
}
// #endregion

// Test component
export function TestComponent() {
  const { mode, selectMode, resolvedTheme } = useTheme();

  return (
    <div>
      <span>Current Theme Mode: {mode}</span>
      <span>Resolved Theme: {resolvedTheme}</span>
      <button onClick={() => selectMode("light")}>Set Light Mode</button>
      <button onClick={() => selectMode("dark")}>Set Dark Mode</button>
      <button onClick={() => selectMode("system")}>Set System Mode</button>
    </div>
  );
}
