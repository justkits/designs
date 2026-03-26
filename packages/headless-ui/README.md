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
import { Tooltip, Popover } from "@justkits/headless-ui";
```

---

## Components

| 컴포넌트  | 상태   | 문서                                 |
| --------- | ------ | ------------------------------------ |
| `Tooltip` | Stable | [docs/Tooltip.md](./docs/Tooltip.md) |
| `Popover` | Stable | [docs/Popover.md](./docs/Popover.md) |
| `Alert`   | Stable | [docs/Alert.md](./docs/Alert.md)     |

---

## Styling

이 라이브러리는 스타일을 포함하지 않는다. 모든 컴포넌트는 DOM 구조와 동작만 제공하며, 스타일은 사용하는 팀이 직접 적용한다.

`className` 또는 `style` prop으로 원하는 요소에 직접 스타일을 적용한다.

```tsx
<Tooltip.Content className="my-tooltip" style={{ background: "black" }}>
  툴팁 내용
</Tooltip.Content>
```

각 컴포넌트가 렌더링하는 DOM 요소는 컴포넌트 문서의 **Anatomy** 섹션을 참고한다.

---

## Quick Start

### Tooltip

```tsx
import { Tooltip } from "@justkits/headless-ui";

function Example() {
  return (
    <Tooltip>
      <Tooltip.Trigger>마우스를 올려보세요</Tooltip.Trigger>
      <Tooltip.Content>툴팁 내용</Tooltip.Content>
    </Tooltip>
  );
}
```

스타일은 `className` 또는 `style`로 `Tooltip.Content`에 직접 적용한다.

```tsx
<Tooltip.Content className="tooltip-content">
  툴팁 내용
  <Tooltip.Arrow className="tooltip-arrow" />
</Tooltip.Content>
```

### Popover

```tsx
import { Popover } from "@justkits/headless-ui";

function Example() {
  return (
    <Popover>
      <Popover.Trigger>열기</Popover.Trigger>
      <Popover.Content aria-label="사용자 메뉴">팝오버 내용</Popover.Content>
    </Popover>
  );
}
```

스타일은 `className` 또는 `style`로 `Popover.Content`에 직접 적용한다.

```tsx
<Popover.Content className="popover-content" aria-label="사용자 메뉴">
  팝오버 내용
  <Popover.Arrow className="popover-arrow" />
</Popover.Content>
```

---

## Notes

- TODO: `Tooltip`과 `Popover`는 포털을 지원하지 않는다. `overflow: hidden` 또는 stacking context가 적용된 컨테이너 안에 배치할 경우 클리핑이 발생할 수 있다.
- TODO: `Tooltip`과 `Popover`는 `asChild` prop을 지원하지 않는다. 향후 릴리즈에서 추가될 예정이다.
- FIXME: `Tooltip.Content` 안에 인터랙티브 요소(링크, 버튼 등)를 넣는 것은 접근성 가이드라인상 권장되지 않는다.
- FIXME: `Popover`는 `position` prop을 지원하지 않는다. 항상 트리거 아래(`bottom`)에 배치되며 공간이 부족하면 위(`top`)로만 전환된다.

## Future Considerations

- **서브패스 임포트 지원** - 현재는 `import { Tooltip, Popover } from "@justkits/headless-ui";` 처럼 배럴 임포트만 지원하지만, 번들 사이즈를 줄이기 위해 `import { Tooltip } from "@justkits/headless-ui/tooltip";`처럼 서브패스 임포트 지원을 고려하고 있다.
