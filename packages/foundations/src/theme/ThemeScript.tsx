/**
 * SSR 시 깜빡거리는 FOUC 현상을 방지하기 위한 테마 스크립트
 * 사용자 로컬 스토리지에 저장된 테마 모드와
 * 시스템 다크 모드 지원 여부를 확인하여
 * 초기 테마를 설정함
 * @returns
 */
import { STORAGE_KEY } from "./manager";

export function ThemeScript() {
  const scriptCode = `
    (function() {
    try {
    var localTheme = localStorage.getItem("${STORAGE_KEY}");
    var supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (localTheme === "dark" || (localTheme !== "light" && supportDarkMode)) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
      document.documentElement.style.colorScheme = "light";
    }
    document.documentElement.classList.add("theme-ready");
    } catch (e) {}
    })()`;

  return <script dangerouslySetInnerHTML={{ __html: scriptCode }} />;
}
