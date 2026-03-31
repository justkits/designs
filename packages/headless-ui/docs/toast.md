# `<Toast />`

사용자에게 비모달 방식으로 간결한 알림을 전달하는 Toast 컴포넌트. 일정 시간 후 자동으로 사라지며, 마우스 호버·포커스 시 타이머가 일시정지된다. 스와이프로 직접 닫을 수 있으며, 포커스를 빼앗지 않고 배경 조작을 막지 않는다.

- **WAI-ARIA Reference**: [status role (WAI-ARIA 1.2)](https://www.w3.org/TR/wai-aria-1.2/#status), [ARIA22: Using role=status to present status messages](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22)
- **WCAG Reference**: [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), [2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)
- **MDN References**: [ARIA: status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role), [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions), [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live), [aria-atomic](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-atomic)

> 명령형으로 어디서든 알림을 띄우는 기능을 지원하는 `@justkits/feedback` 패키지와 함께 사용할 수 있다. (구체적인 사용 예시 등 자세한 내용은 [`@justkits/feedback`의 README 파일](https://github.com/justkits/design-system/blob/main/packages/feedback/README.md)을 참고)

## Anatomy

컴포넌트의 기본적인 합성 구조다.

```tsx
<Toast>
  <Toast.Trigger />
  <Toast.Content>
    <Toast.Message />
    <Toast.Close />
  </Toast.Content>
</Toast>
```

## Examples

### 1. Uncontrolled Mode

`isOpen` 상태를 외부에서 관리하지 않고, `Trigger`와 `Close`가 스스로 상태를 제어하는 방식이다.

```tsx
import { Toast } from "@justkits/headless-ui";

export function SaveNotification() {
  return (
    <Toast>
      <Toast.Trigger>저장</Toast.Trigger>
      <Toast.Content>
        <Toast.Message>변경 사항이 저장되었습니다.</Toast.Message>
        <Toast.Close>닫기</Toast.Close>
      </Toast.Content>
    </Toast>
  );
}
```

### 2. Controlled Mode

`isOpen`과 `onOpenChange`로 외부에서 열림/닫힘 상태를 직접 제어하는 방식이다.

```tsx
import { useState } from "react";
import { Toast } from "@justkits/headless-ui";

export function UploadNotification() {
  const [open, setOpen] = useState(false);

  const handleUpload = async () => {
    await uploadFile();
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleUpload}>업로드</button>
      <Toast isOpen={open} onOpenChange={setOpen}>
        <Toast.Content>
          <Toast.Message>파일이 업로드되었습니다.</Toast.Message>
          <Toast.Close>닫기</Toast.Close>
        </Toast.Content>
      </Toast>
    </>
  );
}
```

### 3. Controlled Mode (Display Only)

외부에서 열림/닫힘을 컨트롤하며, `Toast`는 디스플레이와 타이머 관리만 담당하도록 역할을 분리하는 방식이다. `Trigger` 없이 `isOpen={true}`로 고정하고, `onOpenChange`로 dismiss를 연결한다.

> `@justkits/feedback` 패키지와 함께 사용하기 가장 적합한 방식이다.

```tsx
import type { ToastItemProps } from "@justkits/feedback";
import { Toast } from "@justkits/headless-ui";

export function ToastComponent({ toast }: ToastItemProps) {
  return (
    <Toast isOpen={true} onOpenChange={toast.dismiss} duration={toast.duration}>
      <Toast.Content>
        <Toast.Message>{toast.message}</Toast.Message>
        <Toast.Close>닫기</Toast.Close>
      </Toast.Content>
    </Toast>
  );
}
```

### 4. Infinite Duration

`duration="infinite"`를 사용하면 자동 닫힘이 비활성화된다. 사용자가 직접 닫아야 하는 중요한 알림에 유용하다.

```tsx
import { Toast } from "@justkits/headless-ui";

export function PersistentBanner() {
  return (
    <Toast duration="infinite">
      <Toast.Trigger>공지 표시</Toast.Trigger>
      <Toast.Content>
        <Toast.Message>
          서버 점검이 예정되어 있습니다. 내용을 확인하세요.
        </Toast.Message>
        <Toast.Close>확인</Toast.Close>
      </Toast.Content>
    </Toast>
  );
}
```

### 5. Async Close Action

`Toast.Close`의 `onClick`이 async이면 Promise가 resolve될 때까지 토스트를 닫지 않으며, 그 동안 버튼이 비활성화된다.

```tsx
import { Toast } from "@justkits/headless-ui";

export function UndoNotification() {
  const handleUndo = async () => {
    await undoLastAction();
  };

  return (
    <Toast>
      <Toast.Trigger>삭제</Toast.Trigger>
      <Toast.Content>
        <Toast.Message>항목이 삭제되었습니다.</Toast.Message>
        <Toast.Close onClick={handleUndo}>실행 취소</Toast.Close>
      </Toast.Content>
    </Toast>
  );
}
```

### 6. Custom Trigger with `asChild`

`asChild`를 사용하면 기본 `<button>` 대신 자식 엘리먼트에 동작을 위임할 수 있다.

```tsx
import { Toast } from "@justkits/headless-ui";
import { IconButton } from "./IconButton";

export function CopyNotification() {
  return (
    <Toast>
      <Toast.Trigger asChild>
        <IconButton icon="copy" aria-label="복사" />
      </Toast.Trigger>
      <Toast.Content>
        <Toast.Message>클립보드에 복사되었습니다.</Toast.Message>
        <Toast.Close>닫기</Toast.Close>
      </Toast.Content>
    </Toast>
  );
}
```

## API Reference (Props)

### `Toast`

| Prop             | Type                      | Default                   | Description                                                                                               |
| ---------------- | ------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `children`       | `ReactNode`               | —                         | Toast를 구성하는 하위 컴포넌트들                                                                          |
| `isOpen`         | `boolean`                 | —                         | Controlled 모드에서 열림/닫힘 상태. 생략하면 Uncontrolled 모드로 동작한다.                                |
| `onOpenChange`   | `(open: boolean) => void` | —                         | 열림/닫힘 상태가 변경될 때 호출되는 콜백. `isOpen`만 단독으로 지정하는 것도 허용된다 (display-only 제어). |
| `portal`         | `boolean`                 | `false`                   | `true`이면 `Toast.Content`를 `document.body`에 Portal로 렌더링한다.                                       |
| `duration`       | `number \| "infinite"`    | `5000`                    | 토스트가 자동으로 닫히기까지의 시간 (ms). `"infinite"`이면 자동 닫힘을 비활성화한다.                      |
| `swipeDirection` | `SwipeDirection[]`        | `["left", "right", "up"]` | 스와이프로 닫을 수 있는 방향 목록. 빈 배열(`[]`)을 넘기면 스와이프 닫기를 비활성화한다.                   |
| `swipeThreshold` | `number`                  | `50`                      | 스와이프로 간주하기 위한 최소 이동 거리 (px).                                                             |

### `Toast.Trigger`

Extends `ButtonHTMLAttributes<HTMLButtonElement>`. (`onClick`, `type` 제외)

- `type`: 폼 제출 방지를 위해 `"button"`으로 고정
- `onClick`: Toast를 여는 동작으로 내부에서 처리

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 트리거 동작을 위임한다. |

### `Toast.Content`

Extends `HTMLAttributes<HTMLDivElement>`. (`role`, `aria-live`, `aria-atomic`, `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur` 제외)

- `role`, `aria-live`, `aria-atomic`: `role="status"`, `aria-live="polite"`, `aria-atomic="true"`로 고정
- 마우스/포커스 이벤트 핸들러: 타이머 일시정지/재개 동작으로 내부에서 처리

> **`role`은 status로 고정**: `Toast`는 `role="status"`(polite live region)로 고정 설계되어, 사용자 흐름을 방해하지 않는 비긴급 알림 전용으로 사용한다. 즉각적인 주의가 필요한 긴급 메시지(`role="alert"`, assertive)가 필요하다면 `<Alert />` 컴포넌트를 사용한다.

추가 사용자 지정 prop 없음.

**Structural Styles**

| Property | Default |
| -------- | ------- |
| `zIndex` | `900`   |

### `Toast.Message`

Extends `HTMLAttributes<HTMLParagraphElement>`.

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 메시지 동작을 위임한다. |

### `Toast.Close`

Extends `ButtonHTMLAttributes<HTMLButtonElement>`. (`onClick`, `type` 제외)

- `type`: 폼 제출 방지를 위해 `"button"`으로 고정
- `onClick`: async 지원 및 pending 상태 관리, 자동 닫기 동작을 위해 별도로 재정의
- `disabled`: 외부에서 전달한 값이 존중되며, 버튼 pending 중에는 항상 비활성화된다.

| Prop      | Type                                                          | Default | Description                                                                                                                                                      |
| --------- | ------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asChild` | `boolean`                                                     | `false` | `true`이면 자식 엘리먼트에 닫기 동작을 위임한다.                                                                                                                 |
| `onClick` | `(e: MouseEvent<HTMLButtonElement>) => void \| Promise<void>` | —       | 닫기 버튼 클릭 핸들러. async이면 Promise resolve 전까지 토스트를 닫지 않으며 pending 중 버튼을 비활성화한다. Promise가 reject되면 토스트가 열린 상태로 유지된다. |

## Features

- **Accessible** - `role="status"`, `aria-live="polite"`, `aria-atomic="true"` 자동 관리. 배경 콘텐츠에 `inert`를 적용하지 않으며, 포커스를 빼앗지 않는다.
- **Auto Dismiss** - `duration` prop으로 지정된 시간 후 자동으로 닫힌다. 마우스 호버 및 포커스 진입 시 타이머가 일시정지되고, 벗어나면 남은 시간부터 재개된다.
- **Swipe to Dismiss** - 지정한 방향으로 `swipeThreshold` 이상 스와이프하면 토스트가 닫힌다. 터치 디바이스를 지원한다.
- **Keyboard** - 포커스가 `Toast.Content` 내부에 있을 때 `Escape` 키로 닫을 수 있다.
- **No Focus Trap** - `Tab` 키가 정상적으로 다음 포커스 가능한 요소로 이동한다. 토스트가 열려도 포커스가 자동으로 이동하지 않는다.
- **Async Actions** - `Toast.Close`의 `onClick`이 async이면 Promise resolve 전까지 토스트를 닫지 않으며, pending 중 버튼이 비활성화된다. async close가 시작되면 자동 닫힘 타이머가 일시정지되고, reject되면 남은 시간부터 타이머가 재개된다.
- **Controlled & Uncontrolled** - 두 가지 상태 관리 방식을 모두 지원한다.
- **asChild** - `Toast.Trigger`, `Toast.Message`, `Toast.Close`에서 지원한다.

## Notes

- **`Toast.Close`의 `onClick`이 reject되면 토스트가 닫히지 않는다.** 에러를 직접 처리한 뒤에도 토스트를 열린 상태로 유지하려면 에러를 다시 throw해야 한다. throw하지 않으면 Promise가 resolve된 것으로 간주되어 토스트가 닫힌다.

  ```tsx
  <Toast.Close
    onClick={async () => {
      try {
        await undoAction();
      } catch (e) {
        showError(e); // 에러를 직접 처리
        throw e; // 토스트를 열린 상태로 유지하려면 반드시 다시 throw
      }
    }}
  >
    실행 취소
  </Toast.Close>
  ```

- `Toast.Trigger`는 `Toast.Content` 밖에서 사용해야 한다. `Toast.Content` 안에 배치하면 dev mode에서 콘솔 경고가 출력된다.

- `Toast.Content` 안에서 사용하는 인터랙티브 요소(버튼, 링크 등)는 키보드로 접근할 수 있으나, 포커스가 자동으로 이동하지 않으므로 사용자가 직접 Tab으로 이동해야 한다.

- **`swipeDirection`에 배열 리터럴을 인라인으로 넘기면 매 렌더마다 새 참조가 생성되어 불필요한 리렌더가 발생할 수 있다.** 컴포넌트 외부에 상수로 선언하거나 `useMemo`로 참조를 안정화하는 것을 권장한다.

  ```tsx
  const swipeDirection = useMemo(
    () => ["left", "right"] as SwipeDirection[],
    [],
  );

  <Toast swipeDirection={swipeDirection}>...</Toast>;
  ```

- **WCAG 2.2.1 Timing Adjustable**: 자동 닫힘 기능이 있는 Toast는 [WCAG 2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html) 관련 접근성 이슈를 야기할 수 있다. `Toast`는 이를 위해 `duration="infinite"` 옵션과 마우스 호버·포커스 시 타이머 일시정지 기능을 제공한다. 단, 이러한 제어 수단을 사용자에게 실제로 노출할 책임은 `Toast`를 사용하는 애플리케이션에 있다.

## Known Issues

- `onOpenChange`를 사용하는 Controlled 모드에서는 `isOpen`을 `onOpenChange` 콜백 외부에서 직접 변경해서는 안 된다. `Toast.Close`의 pending 상태 등이 `isOpen` 변화에 맞춰 정리되지 않아 예기치 않은 동작이 발생할 수 있다.
- Controlled 모드에서 `Toast.Close`의 async `onClick`이 처리 중일 때 외부에서 `isOpen`을 `false`로 변경하면, 다음 번에 Toast가 열릴 때 버튼이 비활성화된 채로 시작될 수 있다. `onOpenChange` 콜백을 통해 닫는 정상적인 흐름에서는 발생하지 않는다.

---

## Future Considerations

- **진행 표시(Progress Indicator)**: 남은 자동 닫힘 시간을 시각적으로 표시하는 progress bar 지원
- **Queue / Stack**: 여러 개의 토스트를 큐나 스택으로 관리하는 multi-toast 패턴 지원
