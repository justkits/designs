import { STORAGE_KEY } from "./storage";

const ssrScript = `(function () {
  try {
    var savedTheme = localStorage.getItem("${STORAGE_KEY}");

    if (!savedTheme || savedTheme === "system") {
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var resolvedTheme = prefersDark ? "dark" : "light";

      document.documentElement.dataset.colorScheme = resolvedTheme;
      document.documentElement.style.colorScheme = resolvedTheme;
      return;
    }

    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.dataset.colorScheme = savedTheme;
      document.documentElement.style.colorScheme = savedTheme;
    }
  } catch (e) {}
})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: ssrScript }} />;
}
