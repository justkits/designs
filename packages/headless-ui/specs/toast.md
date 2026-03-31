# Toast Checklist

## Structure

- `Toast`
  - [x] SSR 환경에서도 문제없이 동작해야 한다.
  - [x] "portal" 모드를 지원해야 한다.
  - `Toast.Content`
    - [x] `Toast` 안에서 사용해야 한다.
    - [x] Portal 모드가 아니라면, `Toast`의 직접 자식이어야 한다.
    - `Toast.Message`
      - [x] `Toast.Content` 안에서 사용해야 한다.
      - [x] `asChild` 패턴을 지원한다.
    - `Toast.Close`
      - [x] `Toast.Content` 안에서 사용해야 한다.
      - [x] `asChild` 패턴을 지원한다.
  - `Toast.Trigger`
    - [x] `Toast` 안에서 사용해야 한다.
    - [x] `Toast.Content` 안에서 사용하면 dev mode에서는 경고를 발생시킨다.
    - [x] `asChild` 패턴을 지원한다.

## Aria

- ID
  - [x] `Toast.Message`의 ID와 `Toast.Content`의 `aria-describedby`가 자동으로 연결된다.
  - [x] `Toast.Message`가 없으면 `aria-describedby`는 설정하지 않는다.
- Attributes
  - [x] `Toast.Content`가 `role="status"`, `aria-atomic="true"`, `aria-live="polite"`를 가진다.
  - [x] 배경 콘텐츠에 `inert`를 적용하지 않는다.

## Interactions

- Clicks
  - [x] `Toast.Trigger`를 클릭하면 토스트가 열리고, `Toast.Close`를 클릭하면 토스트가 닫힌다.
- Auto Dismiss
  - [x] `duration` prop에 설정된 시간(ms)이 지나면 자동으로 닫힌다.
  - [x] 마우스가 `Toast.Content` 위에 올라와 있는 동안은 자동 닫힘 타이머가 일시 정지되고, 다시 벗어나면 타이머가 재개된다.
- Keyboard
  - [x] 포커스가 `Toast.Content` 내부에 있을 때 `Escape` 키를 누르면 토스트가 닫힌다.
- Focus
  - [x] 포커스는 `Toast.Content` 안으로 trap되지 않는다. (`Tab` 키는 정상적으로 다음 요소로 이동한다.)
  - [x] 포커스는 Toast가 열린다고 해서 자동으로 Toast.Content로 이동하지 않는다.
- Touch (Swipe to Dismiss)
  - [x] `swipeDirection` prop에 지정한 방향으로 `swipeThreshold` prop에 지정한 거리 이상 스와이프하면 토스트가 닫힌다.

## State

- [x] 내부적으로 열기/닫기를 처리하는 비제어 방식을 지원한다.
- [x] `isOpen`과 `onOpenChange` prop을 통한 제어 컴포넌트 방식도 지원한다.

## Options

- Duration
  - [x] `duration` prop을 지원하며, default는 `5000`이고 단위는 밀리초(ms)이다.
  - [x] `duration`에 `infinite`를 주면 자동 닫힘을 비활성화한다.
- Swipe
  - [x] `swipeDirection` prop은 `SwipeDirection[]` 타입을 받으며, `SwipeDirection`은 `"left" | "right" | "up" | "down"`이다. 기본값은 `["left", "right", "up"]`이다.
  - [x] `swipeThreshold` prop으로 스와이프 최소 거리(px)를 설정할 수 있으며, default는 `50`이다.

## Others

- Async Close Actions
  - [x] 클릭 시 dialog가 닫히지 않고 pending 상태가 되며, 모든 `Toast.Close`가 비활성화 되고, resolve 되면 dialog가 자동으로 닫힌다.
  - [x] reject되면 dialog가 닫히지 않는다.
