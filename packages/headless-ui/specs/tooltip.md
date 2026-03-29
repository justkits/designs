# Tooltip Checklist

## Structure

- `Tooltip`
  - [x] SSR 환경에서도 문제없이 동작해야 한다.
  - [x] "portal" 모드를 지원해야 한다.
  - `Tooltip.Content`
    - [x] `Tooltip` 안에서 사용해야 한다.
    - [x] Portal 모드가 아니라면, `Tooltip`의 직접 자식이어야 한다.
    - `Tooltip.Message`
      - [x] `Tooltip.Content` 안에서 사용해야 한다.
      - [x] `asChild` 패턴을 지원한다.
    - `Tooltip.Arrow`
      - [x] `Tooltip.Content` 안에서 사용해야 한다.
  - `Tooltip.Trigger`
    - [x] `Tooltip` 안에서 사용해야 한다.
    - [x] `Tooltip.Content` 안에서 사용하면 dev mode에서는 경고를 발생시킨다.
    - [x] `asChild` 패턴을 지원한다.

## Aria

- ID
  - [x] `Tooltip.Content`(`role="tooltip"`)의 ID와 `Tooltip.Trigger`의 `aria-describedby` 자동 연결.
- Attributes
  - [x] `Tooltip.Content`가 `role="tooltip"`을 가진다.
  - [x] `Tooltip.Trigger`는 `aria-haspopup`을 가지지 않는다. (tooltip은 dialog가 아님)

## Interactions

- Clicks
  - [x] Tooltip.Trigger를 클릭한다고 해서 Tooltip이 열리지는 않는다.
  - [x] Tooltip이 열려있는 상태에서, Tooltip 바깥을 아무데나 클릭하면 Tooltip이 닫힌다.
  - [x] Tooltip이 열려있는 상태에서, Tooltip.Trigger를 클릭해도 Tooltip이 닫힌다.
- Hover
  - [x] Tooltip.Trigger위를 Hover/Exit하면, 주어진 각 delay 이후 Tooltip이 열리고 닫힌다
  - [x] 마우스가 Trigger에서 Tooltip.Content로 이동하고 Tooltip.Content에 머물러도 툴팁이 닫히지 않는다.
- Focus
  - [x] Keyboard Focus 시, delay 없이 즉시 열리고, Blur 시 즉시 닫힌다.
  - [x] Tooltip이 열리면, 포커스는 Tooltip.Content로 가는게 아니라, Tooltip.Trigger에 유지된다.
  - [x] 포커스는 Tooltip.Content 안으로 trap되지 않는다. (`Tab` 키는 정상적으로 다음 요소로 이동하며, Tooltip은 닫힌다.)
- Touch
  - [x] Trigger를 길게 누르면 (Long Press - `longTouchDuration`만큼) 툴팁이 열린다.
- Keyboard
  - [x] `Escape` 키를 누르면 툴팁이 닫힌다.

## State

- [x] `isOpen`과 `onOpenChange`가 주어지지 않는 비제어 방식 지원
- [x] `isOpen`과 `onOpenChange`가 주어지는 제어 컴포넌트 방식 지원
- [x] `disabled`가 `true`면, 툴팁을 열지 않는다.

## Options

- Delay
  - [x] `openDelay`와 `closeDelay` prop를 지원하며, default는 각각 `300`과 `700`이고 단위는 밀리초(ms)이다.
  - [x] controlled mode이더라도 delay는 똑같이 동작해야 한다.
  - [x] `longTouchDuration` prop을 지원하며, default는 `500`이고 단위는 밀리초(ms)이다.
- Position (`Tooltip.Content` & `Tooltip.Arrow`)
  - [x] `position` prop을 지원하며, default는 `bottom`이다. (`top` | `bottom` | `left` | `right`)
  - [x] 툴팁이 열려 있는 동안 스크롤 또는 윈도우 리사이즈가 발생하면, 툴팁이 Trigger 기준으로 동적으로 재배치된다.
  - [x] 툴팁의 Trigger나 Content의 크기가 변경되면, 자동으로 재계산한다.
  - top/bottom
    - [x] 상하 공간이 부족할 경우 flip한다. (즉, top -> bottom, bottom -> top;)
    - [x] 좌우 공간이 부족할 경우 shiftX한다.
  - left/right
    - [x] 좌우 공간이 부족할 경우 flip한다.
    - [x] 상하 공간이 부족할 경우 shiftY한다.
- Offset
  - [x] `offset` prop을 지원하며, default는 `16`이고 단위는 픽셀이다.
