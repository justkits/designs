# `<Alert />`

모달 형태의 Alert Dialog 컴포넌트. 유저의 즉각적인 주의가 필요하며, 확인이나 취소 등 명시적인 액션을 요구하는 모달 형태의 경고창 컴포넌트다. 포커스 관리, 스크롤 잠금, 키보드 접근성을 기본으로 제공하며, 일반적인 Modal과는 달리 Overlay를 클릭하거나 `Escape` 키를 눌러도 닫히지 않도록 강제한다.

- **WAI-ARIA Reference**: [Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)
- **MDN References**: [aria-busy](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy), [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert)

> 명령형으로 어디서든 알림을 띄우는 기능을 지원하는 `@justkits/feedback` 패키지와 함께 사용할 수 있다. (구체적인 사용 예시 등 자세한 내용은 [`@justkits/feedback`의 README` 파일](https://github.com/justkits/design-system/blob/main/packages/feedback/README.md)을 참고)

## Anatomy

컴포넌트의 기본적인 합성 구조다. 직관적인 뎁스에서 컴포넌트들을 가져와 조합할 수 있도록 설계한다.

```tsx
<Alert>
  <Alert.Trigger />
  <Alert.Overlay />
  <Alert.Content>
    <Alert.Title />
    <Alert.Message />
    <Alert.Button />
  </Alert.Content>
</Alert>
```

## Examples

### 1. Uncontrolled Mode

`isOpen` 상태를 외부에서 관리하지 않고, `Trigger`와 내부 액션 버튼들이 스스로 상태를 제어하는 방식이다.

```tsx
import { Alert } from "@justkits/headless-ui";

export function Logout() {
  return (
    <Alert>
      <Alert.Trigger>로그아웃</Alert.Trigger>
      <Alert.Overlay />
      <Alert.Content>
        <Alert.Title>로그아웃</Alert.Title>
        <Alert.Message>정말로 로그아웃 하시겠습니까?</Alert.Message>
        <Alert.Button onClick={logout}>닫기</Alert.Button>
      </Alert.Content>
    </Alert>
  );
}
```

### 2. Controlled Mode

`isOpen` 상태를 외부에서 관리하는 방식이다.

```tsx
import { useState } from "react";
import { Alert } from "@justkits/headless-ui";

export function UserTable() {
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const handleDelete = async () => {
    await deleteUser(deletingUser!.id);
  };

  return (
    <>
      <table>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>
              <button onClick={() => setDeletingUser(user)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      <Alert
        isOpen={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
      >
        <Alert.Overlay />
        <Alert.Content>
          <Alert.Title>Delete {deletingUser?.name}?</Alert.Title>
          <Alert.Message>This action cannot be undone.</Alert.Message>
          <Alert.Button onClick={handleDelete}>Delete</Alert.Button>
          <Alert.Button>Cancel</Alert.Button>
        </Alert.Content>
      </Alert>
    </>
  );
}
```

### 3. Controlled Mode (Display Only)

`onOpenChange`를 넘기지 않고 외부에서 컨트롤하며, `Alert`는 디스플레이만 담당하도록 역할을 분리하는 방식이다.

> `@justkits/feedback` 패키지와 함께 사용하기 가장 적합한 방식이다.

```tsx
import type { AlertComponentProps } from "@justkits/feedback";
import { Alert } from "@justkits/headless-ui";

export function AlertComponent({ alert }: AlertComponentProps) {
  return (
    <Alert isOpen>
      {" "}
      {/* isOpen은 true로 고정 */}
      <Alert.Overlay />
      <Alert.Content>
        <Alert.Title>{alert.title}</Alert.Title>
        <Alert.Message>{alert.message}</Alert.Message>
        <Alert.Button onClick={alert.onClose}>{alert.closeText}</Alert.Button>
      </Alert.Content>
    </Alert>
  );
}
```

## API Reference (Props)

### `Alert`

| Prop           | Type                      | Default | Description                                                                                               |
| -------------- | ------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`               | —       | Alert를 구성하는 하위 컴포넌트들                                                                          |
| `isOpen`       | `boolean`                 | —       | Controlled 모드에서 열림/닫힘 상태. 생략하면 Uncontrolled 모드로 동작한다.                                |
| `onOpenChange` | `(open: boolean) => void` | —       | 열림/닫힘 상태가 변경될 때 호출되는 콜백. `isOpen`만 단독으로 지정하는 것도 허용된다 (display-only 제어). |
| `portal`       | `boolean`                 | `false` | `true`이면 `Alert.Overlay`와 `Alert.Content`를 `document.body`에 Portal로 렌더링한다.                     |

### `Alert.Trigger`

Extends `ButtonHTMLAttributes<HTMLButtonElement>`. (`type`, `onClick`, `aria-haspopup`, `aria-controls` 제외)

- `type`: 폼 제출 방지를 위해 `"button"`으로 고정
- `onClick`: Alert를 여는 동작으로 내부에서 처리
- `aria-haspopup`, `aria-controls`: 접근성 속성으로 컴포넌트 내부에서 자동 관리

| Prop      | Type      | Default | Description                                        |
| --------- | --------- | ------- | -------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 트리거 동작을 위임한다. |

### `Alert.Overlay`

Extends `HTMLAttributes<HTMLDivElement>`. (`children` 제외)

- `children`: 오버레이는 순수한 시각적 배경 레이어로, 콘텐츠를 포함하지 않는다.

추가 사용자 지정 prop 없음.

**Structural Styles**

| Property   | Default |
| ---------- | ------- |
| `position` | `fixed` |
| `top`      | `0`     |
| `left`     | `0`     |
| `width`    | `100%`  |
| `height`   | `100%`  |
| `zIndex`   | `700`   |

### `Alert.Content`

Extends `HTMLAttributes<HTMLDivElement>`. (`role`, `id`, `tabIndex`, `aria-modal`, `aria-labelledby`, `aria-describedby`, `aria-busy` 제외)

- `role`, `aria-modal`: `role="alertdialog"` 및 `aria-modal="true"`로 고정
- `id`, `aria-labelledby`, `aria-describedby`: 접근성 속성으로 컴포넌트 내부에서 자동 관리
- `tabIndex`: 포커스 가능한 요소가 없을 때를 위해 `-1`로 고정
- `aria-busy`: async 버튼 pending 상태에 따라 자동 관리

추가 사용자 지정 prop 없음.

**Structural Styles**

| Property   | Default    |
| ---------- | ---------- |
| `position` | `relative` |
| `zIndex`   | `1000`     |

### `Alert.Title`

Extends `HTMLAttributes<HTMLHeadingElement>`. (`id` 제외)

- `id`: `Alert.Content`의 `aria-labelledby`와 자동으로 연결하기 위해 내부에서 자동 관리

| Prop      | Type      | Default | Description                                                 |
| --------- | --------- | ------- | ----------------------------------------------------------- |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 `aria-labelledby` ID를 위임한다. |

### `Alert.Message`

Extends `HTMLAttributes<HTMLParagraphElement>`. (`id` 제외)

- `id`: `Alert.Content`의 `aria-describedby`와 자동으로 연결하기 위해 내부에서 자동 관리

| Prop      | Type      | Default | Description                                                  |
| --------- | --------- | ------- | ------------------------------------------------------------ |
| `asChild` | `boolean` | `false` | `true`이면 자식 엘리먼트에 `aria-describedby` ID를 위임한다. |

### `Alert.Button`

Extends `ButtonHTMLAttributes<HTMLButtonElement>`. (`onClick`, `type` 제외)

- `type`: 폼 제출 방지를 위해 `"button"`으로 고정
- `onClick`: async 지원 및 pending 상태 관리, 자동 닫기 동작을 위해 별도로 재정의
- `disabled`: 외부에서 전달한 값이 존중되며, 버튼 pending 중에는 항상 비활성화된다.

| Prop      | Type                                                          | Default | Description                                                                                                                                                              |
| --------- | ------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `asChild` | `boolean`                                                     | `false` | `true`이면 자식 엘리먼트에 버튼 동작을 위임한다.                                                                                                                         |
| `onClick` | `(e: MouseEvent<HTMLButtonElement>) => void \| Promise<void>` | —       | 버튼 클릭 핸들러. async이면 Promise resolve 전까지 다이얼로그를 닫지 않으며 pending 중 모든 버튼을 비활성화한다. Promise가 reject되면 다이얼로그가 열린 상태로 유지된다. |

## Features

- **Accessible** - `role="alertdialog"`, `aria-labelledby`, `aria-describedby` 자동 관리. 열리는 동안 배경 DOM에 `inert`를 적용하여 스크린 리더가 배경 콘텐츠를 읽지 못하도록 차단한다.
- **Focus Trap & Management** - 열리면 `Alert.Content` 내부에 포커스가 갇히며, 닫히면 원래 `Alert.Trigger` 요소로 포커스가 복귀한다.
- **Keyboard & Pointer** - `Tab`/`Shift+Tab`으로 내부 포커스 순환. `Escape` 및 오버레이 클릭은 기본적으로 무시된다.
- **Scroll Lock** - 열린 동안 배경 페이지의 스크롤이 잠긴다.
- **Async Actions** - `Alert.Button`의 `onClick`이 async이면 작업 완료 전까지 dialog를 닫지 않으며, pending 중 모든 버튼이 비활성화된다.
- **Controlled & Uncontrolled** - 두 가지 상태 관리 방식을 모두 지원한다.
- **asChild** - `Alert.Trigger`, `Alert.Button`, `Alert.Title`, `Alert.Message`에서 지원한다.

## Notes

- **`Alert.Button`의 `onClick`이 reject되면 다이얼로그가 닫히지 않는다.** 에러를 직접 처리한 뒤에도 다이얼로그를 열린 상태로 유지하려면 에러를 다시 throw해야 한다. throw하지 않으면 Promise가 resolve된 것으로 간주되어 다이얼로그가 닫힌다.

  ```tsx
  <Alert.Button
    onClick={async () => {
      try {
        await deleteUser();
      } catch (e) {
        showError(e); // 에러를 직접 처리
        throw e; // 다이얼로그를 열린 상태로 유지하려면 반드시 다시 throw
      }
    }}
  >
    삭제
  </Alert.Button>
  ```

- `Alert.Content` 내 첫 번째 포커스 가능한 요소에 자동으로 포커스가 이동한다. 첫 번째 또는 유일한 인터랙티브 요소가 삭제·비가역적 작업을 수행하는 버튼인 경우, Alert가 열리자마자 해당 버튼에 포커스가 이동하여 의도치 않은 실행이 발생할 수 있다. 이 경우 취소 버튼이나 안전한 요소에 `autoFocus`를 지정하는 것을 권장한다.

## Known Issues

- `onOpenChange`를 사용하는 Controlled 모드에서는 `isOpen`을 `onOpenChange` 콜백 외부에서 직접 변경해서는 안 된다. Alert 내부의 pending 상태 등이 `isOpen` 변화에 맞춰 정리되지 않아 예기치 않은 동작이 발생할 수 있다.
- Controlled 모드에서 `Alert.Button`의 async `onClick`이 처리 중일 때 외부에서 `isOpen`을 `false`로 변경하면, 다음 번에 Alert가 열릴 때 모든 버튼이 비활성화된 채로 시작될 수 있다. `onOpenChange` 콜백을 통해 닫는 정상적인 흐름에서는 발생하지 않는다.
- `Alert.Button`의 `onClick`이 동기 함수이거나 생략된 경우, pending 상태에 진입하지 않고 즉시 닫힌다. pending 상태(`aria-busy`, 버튼 비활성화)는 `onClick`이 `Promise`를 반환할 때만 활성화된다.

---

## Future Considerations

- **Confirm 전용 컴포넌트 분리**: `Alert`과 `Confirm`을 별도 컴포넌트로 분리하여 타입 안전성을 높이는 방안
