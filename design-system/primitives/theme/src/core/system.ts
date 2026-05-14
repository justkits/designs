import { useEffect, useState } from "react";

export function useSystemPreference() {
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(
    () =>
      globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false,
  );

  useEffect(() => {
    const query = globalThis.matchMedia?.("(prefers-color-scheme: dark)");
    if (!query) return;

    const listener = (e: MediaQueryListEvent) =>
      setSystemPrefersDark(e.matches);

    query.addEventListener("change", listener);

    return () => query.removeEventListener("change", listener);
  }, []);

  return systemPrefersDark ? "dark" : "light";
}
