# `<Tooltip />`

호버, 키보드 포커스, 또는 길게 누르기(Long Press)로 트리거되는 Tooltip 컴포넌트. 트리거 요소에 대한 보조 설명을 제공하며, 포커스를 빼앗지 않고 Trigger 위에 유지한다. 뷰포트 경계를 고려한 자동 위치 조정을 기본으로 제공한다.

- **WAI-ARIA Reference**: [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

## Anatomy

```tsx
<Tooltip>
  <Tooltip.Trigger />
  <Tooltip.Content>
    <Tooltip.Message />
    <Tooltip.Arrow />
  </Tooltip.Content>
</Tooltip>
```

## Examples

### 1. Basic Usage

```tsx
import { Tooltip } from "@justkits/headless-ui";

export function SaveButton() {
  return (
    <Tooltip>
      <Tooltip.Trigger>저장</Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Message>변경 사항을 저장합니다 (Ctrl+S)</Tooltip.Message>
      </Tooltip.Content>
    </Tooltip>
  );
}
```

### 2. With Arrow

`Tooltip.Arrow`를 `Tooltip.Content` 안에 선택적으로 추가하면 Trigger를 가리키는 방향 화살표가 렌더링된다. `position`이 flip되면 화살표 방향도 자동으로 따라간다.

```tsx
import { Tooltip } from "@justkits/headless-ui";

export function DeleteButton() {
  return (
    <Tooltip position="top">
      <Tooltip.Trigger>삭제</Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        <Tooltip.Message>선택한 항목을 삭제합니다</Tooltip.Message>
      </Tooltip.Content>
    </Tooltip>
  );
}
```

### 3. Custom Trigger with `asChild`

`asChild`를 사용하면 `Tooltip.Trigger`가 렌더링하는 기본 `<button>` 대신 자식 엘리먼트에 트리거 동작을 위임할 수 있다.

```tsx
import { Tooltip } from "@justkits/headless-ui";
import { IconButton } from "./IconButton";

export function InfoIcon() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <IconButton icon="info" aria-label="더 알아보기" />
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Message>추가 정보를 확인하세요</Tooltip.Message>
      </Tooltip.Content>
    </Tooltip>
  );
}
```

### 4. Controlled Mode

`isOpen`과 `onOpenChange`로 외부에서 열림/닫힘 상태를 직접 제어할 수 있다.

```tsx
import { useState } from "react";
import { Tooltip } from "@justkits/headless-ui";

export function GuidedTour() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip isOpen={isOpen} onOpenChange={setIsOpen}>
      <Tooltip.Trigger>도움말</Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Message>여기를 클릭하면 튜토리얼이 시작됩니다</Tooltip.Message>
      </Tooltip.Content>
    </Tooltip>
  );
}
```

## API Reference (Props)

### `Tooltip`

| Prop                | Type                                     | Default    | Description                                                                                                                                                         |
| ------------------- | ---------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`          | `ReactNode`                              | —          | Tooltip을 구성하는 하위 컴포넌트들                                                                                                                                  |
| `isOpen`            | `boolean`                                | —          | Controlled 모드에서 열림/닫힘 상태. 생략하면 Uncontrolled 모드로 동작한다.                                                                                          |
| `onOpenChange`      | `(open: boolean) => void`                | —          | 열림/닫힘 상태가 변경될 때 호출되는 콜백                                                                                                                            |
| `portal`            | `boolean`                                | `false`    | `true`이면 `Tooltip.Content`를 `document.body`에 Portal로 렌더링한다.                                                                                               |
| `position`          | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | 툴팁이 Trigger 기준으로 표시될 방향. 공간이 부족하면 자동으로 flip/shift된다.                                                                                       |
| `offset`            | `number`                                 | `16`       | Trigger와 툴팁 사이의 간격, 그리고 툴팁과 뷰포트 가장자리 사이의 최소 간격을 동시에 제어한다 (픽셀 단위). 두 간격은 같은 값으로 연동되어 독립적으로 설정할 수 없다. |
| `openDelay`         | `number`                                 | `300`      | 호버 시 툴팁이 열리기까지의 지연 시간 (ms)                                                                                                                          |
| `closeDelay`        | `number`                                 | `700`      | 호버가 끝난 후 툴팁이 닫히기까지의 지연 시간 (ms)                                                                                                                   |
| `longTouchDuration` | `number`                                 | `500`      | 터치 디바이스에서 Long Press로 툴팁을 열기까지 필요한 누름 유지 시간 (ms)                                                                                           |
| `disabled`          | `boolean`                                | `false`    | `true`이면 툴팁을 열지 않으며, `Tooltip.Trigger`의 버튼도 비활성화된다. `aria-describedby`도 제거되어 스크린 리더가 존재하지 않는 툴팁을 참조하지 않는다.           |

### `Tooltip.Trigger`

Extends `ButtonHTMLAttributes<HTMLButtonElement>`. (`type`, `aria-describedby`, `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`, `onTouchStart`, `onTouchEnd`, `onTouchMove`, `onTouchCancel` 제외)

- `type`: 기본 버튼은 항상 `type="button"`으로 고정된다. `asChild` 사용 시 자식 엘리먼트의 타입을 직접 지정한다.
- `aria-describedby`: `Tooltip.Content`의 ID와 연결하기 위해 내부에서 자동 관리
- 마우스/포커스/터치 이벤트 핸들러: 툴팁 열기/닫기 동작으로 내부에서 처리

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 트리거 동작을 위임한다. |

### `Tooltip.Content`

Extends `HTMLAttributes<HTMLDivElement>`. (`id`, `role` 제외)

- `id`, `role`: 접근성 속성으로 컴포넌트 내부에서 자동 관리

추가 사용자 지정 prop 없음.

**Structural Styles**

| Property   | Default |
| ---------- | ------- |
| `position` | `fixed` |
| `zIndex`   | `300`   |

### `Tooltip.Message`

Extends `HTMLAttributes<HTMLParagraphElement>`.

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 메시지 동작을 위임한다. |

### `Tooltip.Arrow`

Extends `HTMLAttributes<HTMLDivElement>`. `aria-hidden="true"`가 자동으로 설정된다.

추가 사용자 지정 prop 없음.

**Structural Styles**

| Property          | Default    |
| ----------------- | ---------- |
| `position`        | `absolute` |
| `width`           | `8px`      |
| `height`          | `8px`      |
| `backgroundColor` | `inherit`  |

## Features

- **Accessible** - `role="tooltip"`, `aria-describedby` 자동 관리. `Tooltip.Arrow`는 `aria-hidden="true"`로 시각적 요소만 전달한다.
- **Multiple Interaction Modes** - 호버(delay 지원), 키보드 포커스(즉시 열림), 터치 Long Press를 모두 지원한다.
- **Focus Management** - Tooltip이 열려도 포커스는 항상 `Tooltip.Trigger`에 유지된다. 포커스 트랩 없음.
- **Auto Positioning** - 뷰포트 공간에 따라 자동으로 flip 및 shift되며, 스크롤/리사이즈 시 동적으로 재배치된다. `Tooltip.Arrow`도 함께 재배치된다.
- **Controlled & Uncontrolled** - 두 가지 상태 관리 방식을 모두 지원한다.
- **asChild** - `Tooltip.Trigger`, `Tooltip.Message`에서 지원한다.

## Notes

- `Tooltip.Content` 안에 인터랙티브 요소(버튼, 링크 등)를 넣지 않아야 한다. 포커스가 Trigger에 유지되며 Content로 이동하지 않기 때문에 키보드 사용자가 접근할 수 없다. 인터랙티브 콘텐츠가 필요하다면 Popover 또는 Dialog를 사용하는 것을 권장한다.
- Tooltip은 보조적인 정보만 담아야 한다. 툴팁 없이도 UI를 이해하고 사용할 수 있어야 하며, 필수적인 정보(에러 메시지, 필수 레이블 등)를 툴팁에만 넣으면 안 된다.

## Known Issues

- **단방향 flip만 지원한다**: 공간이 부족할 때 반대 방향으로 한 번만 flip되며, flip된 방향에도 공간이 충분한지는 검증하지 않는다. 뷰포트가 매우 작거나 툴팁이 클 경우 flip 후에도 툴팁이 뷰포트를 벗어날 수 있다.
- **`offset`은 두 간격을 동시에 제어한다**: `offset` prop은 Trigger와 툴팁 사이의 간격, 그리고 툴팁과 뷰포트 가장자리 사이의 최소 여백을 동일한 값으로 연동한다. 두 값을 독립적으로 설정할 수 없다.

## Future Considerations

- **Disabled Trigger 지원**: `asChild`로 전달된 `disabled` 버튼은 마우스/포커스 이벤트가 발생하지 않아 툴팁이 트리거되지 않는다. `<span>` 래퍼를 자동으로 주입하는 방식 등을 고려 중이다.
- **Group / Singleton**: 동일 그룹 내 다른 툴팁이 이미 열려 있을 때 `openDelay` 없이 즉시 열리는 Singleton 동작 지원
