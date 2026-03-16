# Guides: Theme

테마 시스템은 라이트/다크 모드를 `localStorage`와 시스템 설정(`prefers-color-scheme`)을 참조하여 결정하고, React Context를 통해 앱 전체에 제공한다.

---

## 1. 기본 설정

앱의 루트에서 `ThemeProvider`를 감싼다. SSR 환경(Next.js 등)이라면 `ThemeScript`를 `<head>` 안에 추가해야 FOUC(Flash of Unstyled Content)를 방지할 수 있다.

**Next.js (App Router)**

```tsx
// app/layout.tsx
import { ThemeScript, ThemeProvider } from "@justkits/design-foundations";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 2. ThemeProvider

`ThemeProvider`는 결정된 테마를 `document.documentElement`의 `data-theme` 속성으로 적용한다.

```html
<html data-theme="light">
  ...
</html>
<html data-theme="dark">
  ...
</html>
```

이 속성을 CSS에서 활용하여 테마별 변수를 선언한다.

```css
:root[data-theme="light"] {
  --color-background: #ffffff;
  --color-text: #0a0a0a;
}

:root[data-theme="dark"] {
  --color-background: #0a0a0a;
  --color-text: #ffffff;
}
```

> **참고:** `reset.css`를 함께 사용하면, `ThemeScript`가 추가하는 `.theme-ready` 클래스가 준비되기 전까지 트랜지션이 억제되어 색상 전환 시 자연스러운 효과를 얻을 수 있다.

---

## 3. ThemeScript

`ThemeScript`는 SSR 환경에서 페이지 로드 직후 올바른 테마를 즉시 적용하기 위한 인라인 스크립트다. `localStorage`에 저장된 테마 값을 우선으로 읽고, 없으면 `prefers-color-scheme`을 따른다.

- `data-theme` 속성과 `color-scheme` 스타일을 `<html>`에 즉시 적용
- `theme-ready` 클래스를 `<html>`에 추가하여 `reset.css`의 트랜지션 억제를 해제

`ThemeProvider` 없이 `ThemeScript`만 단독으로 사용하면 초기 테마 적용은 되지만, `useTheme` 훅과 런타임 테마 변경은 동작하지 않는다.

---

## 4. `useTheme`

`ThemeProvider` 하위에서 현재 테마 모드를 읽거나 변경할 수 있다.

```tsx
import { useTheme } from "@justkits/design-foundations";

function ThemeToggle() {
  const { mode, setThemeMode } = useTheme();

  return (
    <button onClick={() => setThemeMode(mode === "dark" ? "light" : "dark")}>
      현재 테마: {mode}
    </button>
  );
}
```

| 값             | 타입                            | 설명                                       |
| -------------- | ------------------------------- | ------------------------------------------ |
| `mode`         | `'system' \| 'light' \| 'dark'` | 현재 설정된 테마 모드                      |
| `setThemeMode` | `(mode: ThemeMode) => void`     | 테마 모드를 변경하고 `localStorage`에 저장 |

`mode`가 `'system'`인 경우, 실제 적용되는 테마는 `prefers-color-scheme`에 따라 `'light'` 또는 `'dark'` 중 하나로 결정된다.

`ThemeProvider` 외부에서 `useTheme`을 호출하면 에러가 발생한다.
