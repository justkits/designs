# Alert Checklist

## Structure

- `Alert`
  - [x] SSR 환경에서도 문제없이 동작해야 한다.
  - [x] "portal" 모드를 지원해야 한다.
  - `Alert.Content`
    - [x] `Alert` 안에서 사용해야 한다.
    - [x] Portal 모드가 아니라면, `Alert`의 직접 자식이어야 한다.
    - `Alert.Title`
      - [x] `Alert.Content` 안에서 사용해야 한다.
      - [x] `asChild` 패턴을 지원한다.
    - `Alert.Message`
      - [x] `Alert.Content` 안에서 사용해야 한다.
      - [x] `asChild` 패턴을 지원한다.
    - `Alert.Button`
      - [x] `Alert.Content` 안에서 사용해야 한다.
      - [x] `asChild` 패턴을 지원한다.
  - `Alert.Trigger`
    - [x] `Alert` 안에서 사용해야 한다.
    - [x] `Alert.Content` 안에서 사용하면 dev mode에서는 경고를 발생시킨다.
    - [x] `asChild` 패턴을 지원한다.
  - `Alert.Overlay`
    - [x] `Alert` 안에서 사용해야 한다.
    - [x] `Alert.Content` 안에서 사용하면 dev mode에서는 경고를 발생시킨다.

## Aria

- ID
  - [x] `Alert.Content`의 ID와 `Alert.Trigger`의 `aria-controls`가 자동으로 연결된다.
  - [x] `Alert.Title`의 ID와 `Alert.Content`의 `aria-labelledby`가 자동으로 연결된다.
  - [x] `Alert.Title`이 없으면 `aria-labelledby`는 설정하지 않고, `aria-label="Alert"`가 자동으로 설정된다.
  - [x] `Alert.Message`의 ID와 `Alert.Content`의 `aria-describedby`가 자동으로 연결된다.
  - [x] `Alert.Message`가 없으면 `aria-describedby`와 `aria-description`은 둘 다 설정하지 않는다.
- Attributes
  - [x] `Alert.Trigger`가 `aria-haspopup=dialog`를 가진다.
  - [x] `Alert.Content`가 `role="alertdialog"`와 `aria-modal="true"`를 가진다.
  - [x] Alert가 열리면 `Alert.Content` 외부의 DOM 트리에 `inert` 속성이 적용되어 스크린 리더가 배경 콘텐츠를 읽지 못하도록 한다. Alert가 닫히면 `inert`를 제거한다.

## Interactions

- Clicks
  - [x] 기본적으로 Trigger를 클릭하면 열리고, 내부 버튼을 클릭하면 닫힌다.
  - [x] Overlay를 클릭하더라도 `Alert`가 닫히면 안된다.
- Keyboard
  - [x] Escape키를 누르더라도 `Alert`가 닫히면 안된다.
- Focus
  - Initial Focus
    - [x] Alert가 열릴 때, `Alert.Content` 내 첫번째 포커스가 가능한 요소에 포커스가 이동한다.
    - [x] 포커스 가능한 요소가 없으면 `Alert.Content` 자체로 포커스가 이동한다. (`tabindex="-1"`)
  - Focus Trap
    - [x] `Tab`/`Shift+Tab`은 `Alert.Content` 내부의 포커스 가능한 요소들 사이에서 순환하고, 바깥으로 나갈 수 없다.
  - Return Focus
    - [x] Alert가 닫힐 때, `Alert.Trigger`가 있으면 포커스는 `Alert.Trigger`로 이동한다.
    - [x] 없으면 이전 포커스 요소로 이동한다.
- Others
  - [x] dialog가 열려있는 동안 배경 페이지의 스크롤이 잠기고, 닫히면 복원된다.
  - Async Button Actions (`Alert.Button`의 `onClick`이 Promise를 반환)
    - [x] 클릭 시 dialog가 닫히지 않고 pending 상태가 되며, `Alert.Content`에 `aria-busy="true"`가 설정된다. 또한, 모든 `Alert.Button`이 비활성화된다.
    - [x] resolve되면 dialog가 자동으로 닫힌다.
    - [x] reject되면 dialog가 닫히지 않는다.

## State

- [x] `Alert.Trigger`와 `Alert.Button`이 내부적으로 열기/닫기를 처리하는 비제어 방식을 지원한다.
- [x] `isOpen`과 `onOpenChange` prop을 통한 제어 컴포넌트 방식도 지원한다.
