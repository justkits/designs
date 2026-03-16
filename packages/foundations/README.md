# @justkits/design-foundations

어떤 프로젝트에서든 디자인 시스템을 구축할 때 기반으로 삼을 수 있는 토큰 타입과 테마 시스템을 제공하는 라이브러리다. 구체적인 스타일링은 사용하는 팀의 자유에 맡긴다.

## Installation

```sh
pnpm add @justkits/design-foundations
```

React 19 이상이 필요하다.

---

## What's Included

| 항목                  | 설명                                                                          |
| --------------------- | ----------------------------------------------------------------------------- |
| **토큰 타입**         | 색상, 그림자, 브레이크포인트 등 디자인 토큰의 구조를 정의하는 TypeScript 타입 |
| **테마 시스템**       | 라이트/다크/시스템 모드를 지원하는 `ThemeProvider`, `ThemeScript`, `useTheme` |
| **타이포그래피 타입** | `Text`, `Quote`, `Code` 컴포넌트 구축을 위한 variant 타입과 태그 매핑         |
| **CSS Reset**         | box-sizing, 타이포그래피, 폼 요소 등을 정규화하는 reset 스타일                |

---

## Token Types

토큰 타입은 디자인 토큰이 갖춰야 할 구조를 정의한다. `satisfies`로 구현하면 타입 안전성을 얻으면서 값은 그대로 추론된다.

제공되는 토큰 타입: `ColorTokens`, `ShadowTokens`, `BreakpointsTokensByDevice`, `BreakpointsTokensBySize`

```ts
import type {
  ColorTokens,
  ShadowTokens,
  BreakpointsTokensBySize,
} from "@justkits/design-foundations";

const colors = {
  primary: { default: "#6750A4", hover: "#7965AF", foreground: "#FFFFFF" },
  // ...
} satisfies ColorTokens;
```

---

## Theme System

`ThemeProvider`와 `ThemeScript`로 앱에 라이트/다크 테마를 적용하고, `useTheme` 훅으로 현재 모드를 읽거나 변경할 수 있다. SSR 환경에서의 FOUC 방지도 지원한다.

→ 설정 방법과 CSS 변수 연동은 [docs/guides-theme.md](./docs/guides-theme.md)를 참고한다.

---

## Typography Types

`Text`, `Quote`, `Code` 컴포넌트 구축을 위한 variant 타입과 기본 HTML 태그 매핑을 제공한다. variant 확장도 지원한다.

→ 컴포넌트 구현 예시는 [docs/guides-text.md](./docs/guides-text.md)를 참고한다.

---

## CSS Reset

앱 진입점에서 한 번 import한다.

```ts
import "@justkits/design-foundations/reset.css";
```

box-sizing, 타이포그래피, 폼 요소, 미디어 요소, 리스트 등을 정규화하며, 다크 모드 `color-scheme` 설정과 FOUC 방지용 `theme-ready` 클래스도 포함한다.

---

## Future Considerations

**토큰**

- Spacing — 4, 8, 12, 16... 단계 기반 간격 시스템
- Border radius — 크기 스케일

**CSS 변수 유틸리티** — 토큰 객체를 CSS 라이브러리에 연결할 때 사용하는 유틸리티 (개발 예정)

- `flattenToCSSVars(tokens, prefix?)` — 토큰 객체를 `{ '--color-primary': '#...' }` 형태로 변환
- `toCSSVarRefs(tokens, prefix?)` — 토큰 객체와 동일한 구조에서 각 값을 `var(--x)` 참조로 변환

**CSS 라이브러리 어댑터** — 이 패키지는 의도적으로 라이브러리 독립적으로 유지된다. 추후 전용 어댑터 패키지로 분리할 예정이다.

- `@justkits/theme-vanilla-extract`
- `@justkits/theme-tailwind`

**타이포그래피** — `typeScale`, `spacingScale` 등의 추가 제공 검토

**Z-index** — 구조적인 틀을 벗어나는 z-index 값들에 대해 경고 (Provider 패턴을 사용할 수 있다.)

**Colors** — Primary, Secondary만 선택하면 나머지 색상을 알아서 추천해주는 알고리즘 개발 후 배포
