# `<Popover />`

클릭으로 트리거되는 Popover 컴포넌트. Trigger 요소에 대한 추가 정보나 액션을 제공하며, 포커스를 Content 내부에 가두고 Trigger 위에 떠 있는 형태로 렌더링된다. 뷰포트 경계를 고려한 자동 위치 조정을 기본으로 제공한다.

- **WAI-ARIA References**: [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- **MDN References**: [Popover API — Using the Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using), [aria-haspopup](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup)
- **Open UI Reference**: [Popover Research Explainer](https://open-ui.org/components/popover.research.explainer/)

## Anatomy

```tsx
<Popover>
  <Popover.Trigger />
  <Popover.Content>
    <Popover.Title />
    <Popover.Close />
    <Popover.Arrow />
  </Popover.Content>
</Popover>
```

## Examples

### 1. Basic Usage

```tsx
import { Popover } from "@justkits/headless-ui";

export function ProfileCard() {
  return (
    <Popover>
      <Popover.Trigger>프로필 보기</Popover.Trigger>
      <Popover.Content>
        <Popover.Title>홍길동</Popover.Title>
        <p>프론트엔드 개발자</p>
        <Popover.Close>닫기</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
```

### 2. With Arrow

`Popover.Arrow`를 `Popover.Content` 안에 선택적으로 추가하면 Trigger를 가리키는 방향 화살표가 렌더링된다. `position`이 flip되면 화살표 방향도 자동으로 따라간다.

```tsx
import { Popover } from "@justkits/headless-ui";

export function HelpPopover() {
  return (
    <Popover position="top">
      <Popover.Trigger>도움말</Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Title>도움말</Popover.Title>
        <p>이 기능에 대한 설명입니다.</p>
        <Popover.Close>닫기</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
```

### 3. Custom Trigger with `asChild`

`asChild`를 사용하면 `Popover.Trigger`가 렌더링하는 기본 `<button>` 대신 자식 엘리먼트에 트리거 동작을 위임할 수 있다.

```tsx
import { Popover } from "@justkits/headless-ui";
import { IconButton } from "./IconButton";

export function SettingsPopover() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <IconButton icon="settings" aria-label="설정" />
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>설정</Popover.Title>
        <p>설정 내용이 여기에 들어갑니다.</p>
        <Popover.Close>닫기</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
```

### 4. Controlled Mode

`isOpen`과 `onOpenChange`로 외부에서 열림/닫힘 상태를 직접 제어할 수 있다.

```tsx
import { useState } from "react";
import { Popover } from "@justkits/headless-ui";

export function GuidedTour() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>투어 시작</Popover.Trigger>
      <Popover.Content>
        <Popover.Title>1단계</Popover.Title>
        <p>여기서 프로젝트를 생성할 수 있습니다.</p>
        <Popover.Close>다음</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
```

### 5. Portal Mode

`portal`을 사용하면 `Popover.Content`가 `document.body`에 Portal로 렌더링된다. 부모 요소의 `overflow: hidden`이나 `z-index` 스태킹 컨텍스트에 영향을 받는 경우에 유용하다.

```tsx
import { Popover } from "@justkits/headless-ui";

export function TableRowPopover() {
  return (
    <Popover portal>
      <Popover.Trigger>옵션</Popover.Trigger>
      <Popover.Content>
        <Popover.Title>행 옵션</Popover.Title>
        <Popover.Close>닫기</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
```

## API Reference (Props)

### `Popover`

| Prop           | Type                                     | Default    | Description                                                                                                                                                             |
| -------------- | ---------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`                              | —          | Popover를 구성하는 하위 컴포넌트들                                                                                                                                      |
| `isOpen`       | `boolean`                                | —          | Controlled 모드에서 열림/닫힘 상태. 생략하면 Uncontrolled 모드로 동작한다.                                                                                              |
| `onOpenChange` | `(open: boolean) => void`                | —          | 열림/닫힘 상태가 변경될 때 호출되는 콜백. `isOpen`을 지정하면 반드시 함께 지정해야 한다.                                                                                |
| `portal`       | `boolean`                                | `false`    | `true`이면 `Popover.Content`를 `document.body`에 Portal로 렌더링한다.                                                                                                   |
| `position`     | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | 팝오버가 Trigger 기준으로 표시될 방향. 공간이 부족하면 자동으로 flip/shift된다.                                                                                         |
| `offset`       | `number`                                 | `16`       | Trigger와 팝오버 사이의 간격, 그리고 팝오버와 뷰포트 가장자리 사이의 최소 간격을 동시에 제어한다 (픽셀 단위). 두 간격은 같은 값으로 연동되어 독립적으로 설정할 수 없다. |

### `Popover.Trigger`

Extends `ButtonHTMLAttributes<HTMLButtonElement>`. (`type`, `aria-controls`, `aria-haspopup`, `aria-expanded`, `onClick` 제외)

- `type`: 기본 버튼은 항상 `type="button"`으로 고정된다. `asChild` 사용 시 자식 엘리먼트의 타입을 직접 지정한다.
- `aria-controls`, `aria-haspopup`, `aria-expanded`: 접근성 속성으로 컴포넌트 내부에서 자동 관리
- `onClick`: 팝오버 열기 동작으로 내부에서 처리

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 트리거 동작을 위임한다. |

### `Popover.Content`

Extends `DialogHTMLAttributes<HTMLDialogElement>`. (`role`, `id`, `aria-label`, `aria-labelledby`, `open`, `tabIndex` 제외)

- `role`: `<dialog>` 요소를 사용하여 암묵적으로 `role="dialog"`로 고정
- `id`, `aria-labelledby`: 접근성 속성으로 컴포넌트 내부에서 자동 관리
- `aria-label`: `Popover.Title`이 있으면 설정하지 않고, 없으면 `"Popover Content"`로 자동 설정된다.
- `open`: 팝오버가 열릴 때 자동으로 적용
- `tabIndex`: 포커스 가능한 요소가 없을 때를 위해 `-1`로 고정

추가 사용자 지정 prop 없음.

**Structural Styles**

| Property   | Default |
| ---------- | ------- |
| `position` | `fixed` |
| `zIndex`   | `200`   |

### `Popover.Title`

Extends `HTMLAttributes<HTMLHeadingElement>`. 기본 렌더링 요소는 `<h2>`이다.

- `id`: `Popover.Content`의 `aria-labelledby`와 자동으로 연결하기 위해 내부에서 자동 관리
- `Popover.Content` 외부에서 사용하면 에러가 발생한다.

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 타이틀 동작을 위임한다. |

### `Popover.Close`

Extends `ButtonHTMLAttributes<HTMLButtonElement>`. (`type`, `onClick` 제외)

- `type`: `"button"`으로 고정
- `onClick`: 콜백 실행 후 팝오버를 닫는 동작이 내부에서 처리. async 지원.
- `Popover.Content` 외부에서 사용하면 에러가 발생한다.

| Prop      | Type                                                          | Default | Description                                                                                                                |
| --------- | ------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `asChild` | `boolean`                                                     | `false` | `true`이면 자식 엘리먼트에 닫기 동작을 위임한다.                                                                           |
| `onClick` | `(e: MouseEvent<HTMLButtonElement>) => void \| Promise<void>` | —       | 팝오버가 닫히기 전에 실행할 콜백. async를 지원하며, Promise가 resolve될 때까지 버튼이 비활성화되고 팝오버가 닫히지 않는다. |

### `Popover.Arrow`

Extends `HTMLAttributes<HTMLDivElement>`. (`aria-hidden` 제외) `aria-hidden="true"`가 자동으로 설정된다.

- `Popover.Content` 외부에서 사용하면 에러가 발생한다.

추가 사용자 지정 prop 없음.

**Structural Styles**

| Property          | Default    |
| ----------------- | ---------- |
| `position`        | `absolute` |
| `width`           | `8px`      |
| `height`          | `8px`      |
| `backgroundColor` | `inherit`  |

## Features

- **Accessible** - `<dialog>` 요소를 통해 암묵적으로 `role="dialog"`를 가지며, `aria-controls`, `aria-haspopup`, `aria-expanded`, `aria-labelledby`가 자동으로 관리된다. `Popover.Arrow`는 `aria-hidden="true"`로 시각적 요소만 전달한다.
- **Focus Trap & Management** - 팝오버가 열리면 `Popover.Content` 내부로 포커스가 이동하고 갇힌다. 닫히면 `Popover.Trigger`로 포커스가 복귀한다.
- **Light Dismiss** - 팝오버 바깥 클릭 또는 `Escape` 키로 닫힌다.
- **Auto Positioning** - 뷰포트 공간에 따라 자동으로 flip 및 shift되며, 스크롤/리사이즈 시 동적으로 재배치된다. `Popover.Arrow`도 함께 재배치된다.
- **Portal Support** - `portal` prop으로 `document.body`에 렌더링하여 부모 요소의 스태킹 컨텍스트를 우회할 수 있다.
- **SSR Compatible** - 서버 환경에서도 문제없이 동작하며, Portal은 SSR에서 자동으로 비활성화된다.
- **Controlled & Uncontrolled** - 두 가지 상태 관리 방식을 모두 지원한다.
- **asChild** - `Popover.Trigger`, `Popover.Title`, `Popover.Close`에서 지원한다.

## Notes

- **Controlled 모드에서 `isOpen`과 `onOpenChange`는 항상 함께 지정해야 한다.** TypeScript 타입 수준에서 discriminated union으로 강제된다.
- `Popover.Trigger`를 `Popover.Content` 내부에 렌더링하면 개발 모드에서 경고가 발생한다. 포커스 트랩으로 인해 예기치 않은 동작이 발생할 수 있으므로 반드시 `Popover.Content` 외부에 배치해야 한다.
- `Popover.Title`, `Popover.Close`, `Popover.Arrow`는 반드시 `Popover.Content` 내부에서 사용해야 한다. 외부에서 사용하면 에러가 발생한다.
- Tooltip과 달리 Popover는 인터랙티브 콘텐츠(버튼, 링크, 폼 요소 등)를 포함할 수 있다. 포커스 트랩이 적용되어 키보드 사용자도 Content 내부의 모든 요소에 접근할 수 있다.

## Known Issues

- **단방향 flip만 지원한다**: 공간이 부족할 때 반대 방향으로 한 번만 flip되며, flip된 방향에도 공간이 충분한지는 검증하지 않는다. 뷰포트가 매우 작거나 팝오버가 클 경우 flip 후에도 팝오버가 뷰포트를 벗어날 수 있다.
- **`offset`은 두 간격을 동시에 제어한다**: `offset` prop은 Trigger와 팝오버 사이의 간격, 그리고 팝오버와 뷰포트 가장자리 사이의 최소 여백을 동일한 값으로 연동한다. 두 값을 독립적으로 설정할 수 없다.
- **`aria-label` 폴백이 영어로 고정되어 있다**: `Popover.Title`을 사용하지 않으면 `Popover.Content`에 `aria-label="Popover Content"`가 자동으로 설정된다. 이 값은 현재 영어로 고정되어 있어 한국어 등 다른 언어 환경에서 스크린 리더가 영어로 읽을 수 있다. `Popover.Title`을 사용하면 이 폴백이 적용되지 않는다.

## Future Considerations

- **`aria-modal` 지원**: 현재는 `aria-modal`을 적용하지 않아 일부 스크린 리더에서 배경 콘텐츠를 읽을 수 있다. 배경 요소에 `inert`를 적용하는 방식과 함께 고려 중이다.
