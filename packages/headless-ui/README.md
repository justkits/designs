# @justkits/headless-ui

스타일 없이 접근성과 동작만 갖춘 헤드리스 UI 컴포넌트 라이브러리다. 스타일은 사용하는 팀이 자유롭게 입힌다.

## Requirements

- React 19 이상

## Installation

```sh
pnpm add @justkits/headless-ui
```

---

## Imports

각 컴포넌트는 배럴 경로로부터 가져올 수 있다.

```ts
import { Alert } from "@justkits/headless-ui";
```

---

## Components

| 컴포넌트  | 상태   | 문서                                 |
| --------- | ------ | ------------------------------------ |
| `Alert`   | Stable | [docs/alert.md](./docs/alert.md)     |
| `Popover` | Stable | [docs/popover.md](./docs/popover.md) |
| `Tooltip` | Stable | [docs/tooltip.md](./docs/tooltip.md) |

---

## Styling

이 라이브러리는 스타일을 포함하지 않는다. 모든 컴포넌트는 DOM 구조와 동작만 제공하며, 스타일은 사용하는 팀이 직접 적용한다.

`className` 또는 `style` prop으로 원하는 요소에 직접 스타일을 적용한다.

```tsx
<Alert.Content className="my-alert" style={{ background: "black" }}>
  Alert 내용
</Alert.Content>
```

각 컴포넌트가 렌더링하는 DOM 요소는 컴포넌트 문서의 **Anatomy** 섹션을 참고한다.

### Structural Styles

일부 컴포넌트는 레이아웃 또는 스태킹에 필요한 구조적 기본 스타일을 주입한다. 이 스타일들은 `style` prop을 통해 덮어쓸 수 있다.

> **Note:** 구조적 스타일은 인라인 스타일(`style` prop)로 적용되므로 CSS 명시도(specificity)가 가장 높다. 재정의하려면 `style` prop을 사용하거나 Tailwind, vanilla-extract 등 `className` 기반 방식에서는 `!important`를 사용해야 한다.

각 컴포넌트의 구체적인 구조적 스타일 값은 해당 컴포넌트 문서의 **API Reference** 섹션을 참고한다. [예시: Alert](./docs/alert.md#api-reference-props)

### Z-Index Scale

라이브러리 전체에서 사용하는 z-index 값이다. 프로젝트의 stacking context에 맞게 재정의할 수 있다.

> **Note:** z-index 역시 인라인 스타일로 적용되므로, `style` prop을 사용하거나 `className`에서 `!important`를 사용해야 재정의할 수 있다.

| Token      | Value | 사용 컴포넌트   |
| ---------- | ----- | --------------- |
| `hide`     | -1    | —               |
| `sticky`   | 100   | —               |
| `menu`     | 200   | —               |
| `dropdown` | 200   | —               |
| `popover`  | 200   | `Popover`       |
| `tooltip`  | 300   | `Tooltip`       |
| `overlay`  | 700   | `Alert.Overlay` |
| `modal`    | 800   | —               |
| `toast`    | 900   | `Toast`         |
| `alert`    | 1000  | `Alert.Content` |

---

## DOM Behavior

이 라이브러리는 닫힌 상태의 컴포넌트를 DOM에서 제거하는 방식을 기본으로 한다. `Popover.Content`, `Tooltip.Content`, `Alert.Content` 등은 닫혀 있을 때 렌더링되지 않는다.

이 방식을 사용하면 `aria-controls`처럼 상대 요소를 참조하는 ARIA 속성이 닫혀 있는 동안 DOM에서 제거된다. 애니메이션이 필요하다면 `@justkits/motion`의 `useAnimatedExit()` 훅을 사용하는 것을 권장한다.

---

## Future Considerations

- **서브패스 임포트 지원** - 현재는 `import { Alert } from "@justkits/headless-ui";` 처럼 배럴 임포트만 지원하지만, 번들 사이즈를 줄이기 위해 `import { Alert } from "@justkits/headless-ui/alert";`처럼 서브패스 임포트 지원을 고려하고 있다.
- **data-state 속성** - `data-state="open"|"closed"`를 제공하여 CSS 트랜지션 및 애니메이션에 활용할 수 있도록 지원.
  - 현재는 `@justkits/motion`의 `useAnimatedExit()` 훅을 사용할 것을 권장한다.
- **data-\* 속성** - 현재는 `data-state` 외에도 `dataset`을 사용하고 있지 않다. 추후 사용을 고려한다.
