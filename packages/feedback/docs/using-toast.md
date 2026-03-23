# @justkits/feedback - Using the Toast module (in depth)

본 라이브러리의 `toast` 모듈을 사용하는 구체적인 방법을 여러가지 제안한다.

## Basic Usage

### `<ToastsComponent />` 준비

`<Toaster />`에 주입할 `<ToastsComponent />`를 준비해야 한다.

> `props`로 `toasts` 배열이 들어오기 때문에:
>
> - `<Toaster maxToasts={1} />` 처럼 한번에 하나만 렌더링 되도록 제한을 둔 다음 하나만 처리하거나,
> - 한번에 여러 toast를 렌더할 수 있도록, 컴포넌트를 준비해야 한다.

> 각 `ToastObject`에는 `dismiss()`가 이미 바인딩되어 있으므로 별도의 dismiss prop이 필요하지 않다.

```tsx
import { ToastItemProps, ToastsComponentProps } from "@justkits/feedback";

function Toast({ toast }: ToastItemProps) {
  return (
    <div>
      <span>
        [{toast.type}] {toast.message}
      </span>
      <button onClick={toast.dismiss}>✕</button>
    </div>
  );
}

export function ToastsComponent({ toasts }: ToastsComponentProps) {
  return (
    <div style={{ position: "fixed", top: 16, right: 16 }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
```

### `<Toaster />` 마운트

준비한 컴포넌트를 앱 루트 (`App.tsx` / `main.tsx` 등)에서 주입한다. `maxToasts`로 동시에 표시할 최대 개수를 제한할 수 있다 (기본값: 5).

```tsx
import { Toaster } from "@justkits/feedback";
import { ToastsComponent } from "./components";

function App() {
  return (
    <>
      <Toaster ToastsComponent={ToastsComponent} />
      {/* 나머지 앱 */}
    </>
  );
}
```

### toast API 사용

마운트 후에는 컴포넌트 트리 어디서든 명령형으로 호출한다.

```tsx
/// React 컴포넌트 내에서 예시
import { toast } from "@justkits/feedback";

export function Page() {
  const handleRefresh = () => {
    toast("Refreshing page...", { duration: 5000 });
  };

  return (
    <div>
      {/* Rest of page */}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

/// React 외 예시
import { toast } from "@justkits/feedback";

export function updateData() {
  try {
    await updateAPI();

    toast.success("Successfully updated data!", { duration: "infinite" });
  } catch {
    // ...
  }
}
```

더 많은 활용 예시는 [toast API 문서](./toast-api.md)를 참고하면 된다.

### Exit 애니메이션 처리

`<Toaster />`는 `toast.dismiss()`가 호출되는 즉시 해당 toast를 상태에서 제거한다. 따라서 exit 애니메이션을 재생하려면 **`toast.dismiss`를 직접 닫기 핸들러로 전달하지 말고**, 애니메이션이 완료된 후에 호출되도록 지연시켜야 한다.

```tsx
function ToastItem({ toast }: ToastItemProps) {
  const handleDismiss = () => {
    // 애니메이션 재생 후 dismiss 호출
    // (애니메이션 라이브러리의 onAnimationEnd 콜백, setTimeout 등을 활용)
    runExitAnimation(() => toast.dismiss());
  };

  return (
    <div>
      <span>{toast.message}</span>
      <button onClick={handleDismiss}>×</button>
    </div>
  );
}
```

`@justkits/motion`을 사용하면 이 패턴을 `useAnimatedExit`으로 간편하게 처리할 수 있다. 자세한 내용은 [With `@justkits/motion`](#with-justkitsmotion) 섹션을 참고.

---

## With `@justkits/headless-ui`

`@justkits/feedback`의 상태 관리 기능과 `@justkits/headless-ui`의 렌더링 기능을 함께 사용하면 간편하게 앱에서 Toast 기능을 사용할 수 있다.

### Installation

```bash
pnpm add @justkits/feedback @justkits/headless-ui
```

### 컴포넌트 준비

`Toaster`는 활성 toast 목록 전체를 받는 `ToastsComponent` prop 하나를 받는다. `@justkits/headless-ui`의 `Toast`를 사용해 각 toast를 렌더한다.

각 `ToastObject`에는 `dismiss` 함수와 `duration`이 포함되어 있다. `dismiss`를 `onOpenChange`에 전달해 타이머가 만료되면 `Toast` provider가 스스로 닫힐 수 있도록 한다.

`@justkits/headless-ui`의 `Toast` provider는 자동 dismiss 타이머를 내부적으로 관리한다. 타이머가 만료되면 `onOpenChange(false)`를 호출하고, 이것이 `toast.dismiss`로 연결되어 feedback 상태에서 toast를 제거한다.

`Toast.Content`는 hover 및 focus 시 타이머를 자동으로 일시정지하고, mouse-leave 및 blur 시 재개한다.

```tsx
// components/Toasts.tsx
import type { ToastsComponentProps, ToastItemProps } from "@justkits/feedback";
import { Toast } from "@justkits/headless-ui";

export function Toasts({ toasts }: ToastsComponentProps) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: ToastItemProps) {
  return (
    <Toast isOpen={true} onOpenChange={toast.dismiss} duration={toast.duration}>
      <Toast.Content className="flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg min-w-64">
        <Toast.Message className="flex-1 text-sm">
          {toast.message}
        </Toast.Message>
        <Toast.Close className="text-gray-400 hover:text-white text-lg leading-none">
          ×
        </Toast.Close>
      </Toast.Content>
    </Toast>
  );
}
```

### `<Toaster />` 마운트

```tsx
// app/layout.tsx (Next.js) 또는 main.tsx (Vite)
import { Toaster } from "@justkits/feedback";
import { Toasts } from "@/components/Toasts";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster ToastsComponent={Toasts} maxToasts={5} />
      </body>
    </html>
  );
}
```

### API 호출

`<Toaster />`를 마운트 했다면, Basic Usage에서의 [예시](#toast-api-사용)와 마찬가지로, [toast API 문서](./toast-api.md)를 참고하여 API를 호출하면 된다.

## With `@justkits/motion`

Toast는 motion을 활용하기에 가장 적합한 use case다. 각 toast는 마운트될 때 enter 애니메이션을 재생하고, 큐에서 제거되기 전에 exit 애니메이션을 재생해야 한다.

### Installation

```bash
pnpm add @justkits/feedback @justkits/motion
```

### Setup

앱 entry point에서 keyframes를 한 번 import한다.

```ts
import "@justkits/motion/keyframes.css";
```

### 컴포넌트에 애니메이션 주입

`useAnimatedExit`를 활용하여 닫기 동작을 가로채어 토스트가 dismiss되기 전에 exit 애니메이션을 재생할 수 있도록 한다.

#### `<ToastsComponent />`

> 핵심 포인트: `toast.dismiss`를 `Toast`의 `onOpenChange`에 직접 전달하는 대신, `useAnimatedExit`의 `startClosing`을 전달한다. 이렇게 하면 수동 닫기(`Toast.Close` 버튼)와 타이머 기반 자동 dismiss 모두를 가로채어, toast가 제거되기 전에 exit 애니메이션을 재생한다.

```tsx
import type { ToastsComponentProps, ToastItemProps } from "@justkits/feedback";
import { transition, useAnimatedExit } from "@justkits/motion";

export function ToastsComponent({ toasts }: ToastsComponentProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: ToastItemProps) {
  const { exiting, startClosing } = useAnimatedExit(300, toast.dismiss);

  return (
    <div style={transition({ name: "slide-left", duration: 300, exiting })}>
      <span>{toast.message}</span>
      <button onClick={startClosing}>×</button>
    </div>
  );
}
```

**동작 순서:**

1. Toast 마운트 → `slide-left-in` 애니메이션 재생.
2. 타이머 만료 또는 닫기 버튼 클릭 → `startClosing()` 호출 → `exiting: true` → `slide-left-out` 재생.
3. 300ms 후 `toast.dismiss()` 호출 → toast가 큐에서 제거 → 컴포넌트 언마운트.

---

## `type` 스타일링

`ToastObject`의 `type` 필드(`"default" | "info" | "success" | "warning" | "error"`)를 활용해 variant 스타일을 적용할 수 있다. 아래 예시는 `@justkits/headless-ui`와 `@justkits/motion`을 모두 사용하였다.

```tsx
import { type TransitionAnimationNames } from "@justkits/motion";

const typeStyles: Record<ToastObject["type"], string> = {
  default: "bg-gray-900 text-white",
  info: "bg-blue-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-yellow-500 text-gray-900",
  error: "bg-red-600 text-white",
};

const animationByType: Record<ToastObject["type"], TransitionAnimationNames> = {
  default: "fade",
  info: "slide-left",
  success: "slide-left",
  warning: "slide-up",
  error: "pop",
};

function ToastItem({ toast }: ToastItemProps) {
  const { exiting, startClosing } = useAnimatedExit(300, toast.dismiss);
  const animName = animationByType[toast.type];

  return (
    <Toast isOpen={true} onOpenChange={startClosing} duration={toast.duration}>
      <Toast.Content
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${typeStyles[toast.type]}`}
        style={transition({ name: animName, duration: 300, exiting })}
      >
        <Toast.Message className="flex-1 text-sm">
          {toast.message}
        </Toast.Message>
        <Toast.Close
          className="opacity-70 hover:opacity-100"
          onClick={startClosing}
        >
          ×
        </Toast.Close>
      </Toast.Content>
    </Toast>
  );
}
```

---
