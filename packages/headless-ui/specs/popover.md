# Popover Checklist

## Structure

- `Popover`
  - [x] SSR 환경에서도 문제없이 동작해야 한다.
  - [x] "portal" 모드를 지원해야 한다.
  - `Popover.Content`
    - [x] `Popover` 안에서 사용해야 한다.
    - [x] Portal 모드가 아니라면, `Popover`의 직접 자식이어야 한다.
  - `Popover.Title`
    - [x] `Popover.Content` 안에서 사용해야 한다.
    - [x] `asChild` 패턴을 지원한다.
  - `Popover.Close`
    - [x] `Popover.Content` 안에서 사용해야 한다.
    - [x] `asChild` 패턴을 지원한다.
  - `Popover.Arrow`
    - [x] `Popover.Content` 안에서 사용해야 한다.
  - `Popover.Trigger`
    - [x] `Popover` 안에서 사용해야 한다.
    - [x] `Popover.Content` 안에서 사용하면 dev mode에서는 경고를 발생시킨다.
    - [x] `asChild` 패턴을 지원한다.

## Aria

- ID
  - [x] `Popover.Content`의 ID와 `Popover.Trigger`의 `aria-controls`가 자동으로 연결된다.
  - [x] `Popover.Title`의 ID와 `Popover.Content`의 `aria-labelledby`가 자동으로 연결된다.
- Attributes
  - [x] `Popover.Trigger`가 `aria-haspopup="dialog"`를 가진다.
  - [x] `Popover.Trigger`가 `aria-expanded`를 가지며, 팝오버가 열리면 `"true"`, 닫히면 `"false"`가 된다.
  - [x] `Popover.Content`는 `<dialog>` 요소를 사용하여 암묵적으로 `role="dialog"`를 가지며, 기본 `aria-label`을 가진다. `aria-modal`은 가지지 않는다.
  - [x] `Popover.Content`의 `aria-label`은 재정의할 수 있다.
  - [x] `Popover.Arrow`는 `aria-hidden="true"`를 가진다.

## Interactions

- Clicks
  - [x] `Popover.Trigger`를 클릭하면 팝오버가 열린다.
  - [x] 팝오버가 열려있는 상태에서, 팝오버 바깥을 클릭하면 닫힌다.
  - [x] 팝오버가 열려있는 상태에서, Popover.Close를 클릭하면 닫힌다.
- Keyboard
  - [x] `Escape` 키를 누르면 팝오버가 닫힌다.
  - [x] `Tab`/`Shift+Tab`은 `Popover.Content` 내부의 포커스 가능한 요소들 사이에서 순환하고, 바깥으로 나갈 수 없다.
- Focus
  - Initial Focus
    - [x] 팝오버가 열릴 때, `Popover.Content` 내 첫 번째 포커스 가능한 요소에 포커스가 이동한다.
    - [x] 포커스 가능한 요소가 없으면 `Popover.Content` 자체로 포커스가 이동한다. (`tabindex="-1"`)
  - Return Focus
    - [x] 팝오버가 닫힐 때, `Popover.Trigger`로 포커스가 돌아온다.

## State

- [x] 내부적으로 열기/닫기를 처리하는 비제어 방식을 지원한다.
- [x] `isOpen`과 `onOpenChange` prop을 통한 제어 컴포넌트 방식도 지원한다.

## Options

- Position (`Popover.Content` & `Popover.Arrow`)
  - [x] `position` prop을 지원하며, default는 `"bottom"`이다. (`top` | `bottom` | `left` | `right`)
  - [x] 팝오버가 열려 있는 동안 스크롤 또는 윈도우 리사이즈가 발생하면, 팝오버가 Trigger 기준으로 동적으로 재배치된다.
  - [x] 팝오버의 Trigger나 Content의 크기가 변경되면, 자동으로 재계산한다.
  - top/bottom
    - [x] 상하 공간이 부족할 경우 flip한다. (즉, `"top"` → `"bottom"`, `"bottom"` → `"top"`)
    - [x] 좌우 공간이 부족할 경우 shiftX한다.
  - left/right
    - [x] 좌우 공간이 부족할 경우 flip한다.
    - [x] 상하 공간이 부족할 경우 shiftY한다.
- Offset
  - [x] `offset` prop을 지원하며, default는 `16`이고 단위는 픽셀이다.

## References

- [WAI-ARIA APG: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) — focus trap, initial/return focus, `role="dialog"` semantics
- [WAI-ARIA APG: Disclosure (Show/Hide) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) — `aria-expanded`, `aria-controls` wiring for toggle triggers
- [MDN: Popover API — Using the Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using) — light dismiss, Escape key, focus return, `auto` vs `manual`
- [MDN: aria-haspopup](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup) — valid values and when to omit
- [Open UI: Popover Research Explainer](https://open-ui.org/components/popover.research.explainer/) — design rationale, taxonomy vs tooltip and modal dialog
