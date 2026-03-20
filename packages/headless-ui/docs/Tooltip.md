# Tooltip

뷰포트 인식 위치 조정과 키보드 접근성을 갖춘 툴팁 컴포넌트다. 컴파운드 컴포넌트 패턴으로 구성된다.

## Feature Specification

### State Management

- [x] **제어/비제어 상태 지원**: isOpen, onOpenChange props를 제공하여 사용자가 직접 상태를 제어할 수 있도록 지원
- [x] **지연 시간 (Delay)**: 마우스가 빠르게 스쳐 지나갈 때 툴팁이 번쩍이는 현상을 막기 위해 (Flickering) delay 기능을 제공

### Events / Triggers

- [x] **마우스 인터렉션 감지**: 마우스 hover/exit 이벤트 감지
- [x] **포커스 인터렉션 감지**: 키보드 `Tab`을 이용한 focus/blur 이벤트 감지
- [x] **모바일 인터렉션 지원**: 터치스크린에는 Hover 개념이 없으니, Long press로 열고 바깥에 터치하면 닫히도록 지원

### Accessibility

- [x] **ARIA 속성 자동 매핑**: `aria-describedby="tooltip-id"를 부여하고, 툴팁 콘텐츠에 `role="tooltip"`과 고유 `id`를 자동 연결해 스크린 리더가 읽을 수 있게 한다
- [x] **`Escape`로 닫기**: 툴팁이 열린 상태에서 `Esc` 키를 누르면 즉시 툴팁이 닫히도록 이벤트 수신

### Positioning

- [x] **배치 및 충돌 감지**: `placement` 설정 기능. 뷰포트를 벗어나려 할 때, 상하는 반대쪽으로 뒤집히는 (Flip) 기능을, 좌우는 위치를 보정하는 (Shift) 기능을 제공
- [x] **Arrow**: 툴팁 화살표를 만들고자 하는 개발자를 위해 트리거 요소의 중앙에 맞춰 화살표가 위치할 수 있도록 좌표를 계산하여 제공

---

## Structure

반드시 `Tooltip` 안에서 `Tooltip.Trigger`와 `Tooltip.Content`를 사용해야 한다.

| 컴포넌트          | 설명                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `Tooltip`         | 컨텍스트 프로바이더. 상태와 위치를 관리한다.                         |
| `Tooltip.Trigger` | 트리거 요소 (`<button>` 렌더). 호버·포커스·롱터치 이벤트를 처리한다. |
| `Tooltip.Content` | 플로팅 콘텐츠. 열린 상태에서만 렌더된다.                             |
| `Tooltip.Arrow`   | 방향 화살표. `Tooltip.Content` 안에서 선택적으로 사용한다.           |

```tsx
<Tooltip>
  <Tooltip.Trigger>마우스를 올려보세요</Tooltip.Trigger>
  <Tooltip.Content>
    툴팁 내용
    <Tooltip.Arrow />
  </Tooltip.Content>
</Tooltip>
```

---

## Props

### `Tooltip`

| Prop           | 타입                                     | 기본값     | 설명                                                                         |
| -------------- | ---------------------------------------- | ---------- | ---------------------------------------------------------------------------- |
| `delay`        | `number`                                 | `300`      | 툴팁이 표시되기까지의 지연 시간 (ms)                                         |
| `position`     | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | 기본 배치 방향. 뷰포트 공간이 부족하면 자동으로 반전된다.                    |
| `isOpen`       | `boolean`                                | —          | 제어 모드에서 외부에서 열림 상태를 지정한다. `onOpenChange`와 함께 사용한다. |
| `onOpenChange` | `(open: boolean) => void`                | —          | 툴팁 상태가 변경될 때 호출되는 콜백. `isOpen`과 함께 사용한다.               |

`isOpen`과 `onOpenChange`는 함께 전달하거나 둘 다 생략해야 한다 (controlled / uncontrolled).

### `Tooltip.Trigger`

`<button>` 엘리먼트의 모든 props를 지원한다. 단, 아래 항목은 내부에서 제어하므로 전달할 수 없다:
`aria-describedby`, `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur`, `onTouchStart`, `onTouchEnd`, `onTouchMove`, `onTouchCancel`, `type`.

| Prop      | 타입      | 기본값  | 설명                                     |
| --------- | --------- | ------- | ---------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 요소를 트리거로 사용한다 |

### `Tooltip.Content`

`<div>` 엘리먼트의 모든 props를 지원한다.

> **주의**: 내부적으로 `pointer-events: none`이 적용된다. 콘텐츠 안에 링크나 버튼 등 인터랙티브 요소를 넣으면 클릭이 동작하지 않는다.

### `Tooltip.Arrow`

`<div>` 엘리먼트의 모든 props를 지원한다. `Tooltip.Content` 외부에서 사용하면 오류가 발생한다.

---

## Behavior

### Show / Hide

| 이벤트                                      | 동작                                |
| ------------------------------------------- | ----------------------------------- |
| `mouseenter`                                | `delay` ms 후 표시                  |
| `mouseleave`                                | 즉시 숨김 (대기 중인 타이머도 취소) |
| `focus`                                     | `delay` ms 후 표시                  |
| `blur`                                      | 즉시 숨김                           |
| 트리거 위에서 500ms 이상 터치 유지 (롱터치) | 닫혀있을 때만 즉시 표시             |
| `touchstart` / `mousedown` (외부 영역)      | 즉시 숨김                           |
| `Escape`                                    | 즉시 숨김                           |

롱터치는 `touchmove`나 `touchcancel`이 발생하면 취소된다.

### Positioning

`TooltipContent`가 마운트될 때 `useLayoutEffect`에서 위치를 계산한다. 브라우저가 페인트하기 전에 보정이 완료되므로 플래시가 발생하지 않는다.

- **플립**: 지정한 방향에 공간이 부족하면 반대 방향으로 자동 전환된다 (top ↔ bottom, left ↔ right).
- **시프트**: 뷰포트 가장자리에서 잘리지 않도록 수평 또는 수직 위치를 이동한다 (기본 여백 16px).
- **화살표 보정**: 시프트가 적용된 경우, `Tooltip.Arrow`는 항상 트리거를 가리키도록 역방향으로 보정된다.

윈도우 리사이즈 및 스크롤 시에도 위치가 재계산된다.

> **스타일 주의**: 툴팁 콘텐츠와 트리거 사이의 간격은 자동으로 추가되지 않는다. `Tooltip.Content`에 `margin` 또는 `padding`을 적용해 간격을 직접 지정해야 한다.

### `asChild` Pattern

`asChild={true}`이면 `cloneElement`로 자식 요소에 트리거 props를 주입한다. 자식이 이미 `<button>`인 경우 중첩 버튼 문제를 피할 수 있다.

```tsx
<Tooltip>
  <Tooltip.Trigger asChild>
    <button onClick={handleClick}>액션</button>
  </Tooltip.Trigger>
  <Tooltip.Content>설명</Tooltip.Content>
</Tooltip>
```

자식 요소에 `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur` 핸들러가 있는 경우 기존 핸들러가 먼저 호출된 뒤 툴팁 동작이 실행된다.

### Controlled Mode

```tsx
const [open, setOpen] = useState(false);

<Tooltip isOpen={open} onOpenChange={setOpen}>
  <Tooltip.Trigger>트리거</Tooltip.Trigger>
  <Tooltip.Content>툴팁 내용</Tooltip.Content>
</Tooltip>;
```

---

## Accessibility

- `Tooltip.Content`에 `role="tooltip"`이 적용된다.
- `Tooltip.Content`에 `aria-live="polite"`가 적용되어 스크린 리더가 툴팁 표시를 감지한다.
- `Tooltip.Trigger`의 `aria-describedby`가 `Tooltip.Content`의 `id`와 자동으로 연결된다.
- `Tooltip.Arrow`는 `aria-hidden="true"`로 스크린 리더에서 숨긴다.
- 키보드 포커스와 `Escape` 키를 지원한다.

---

## Known Issues

- **포털 미지원**: 플로팅 콘텐츠가 DOM 트리 안에 렌더된다. 부모 컨테이너에 `overflow: hidden`이나 stacking context가 있으면 클리핑될 수 있다.
