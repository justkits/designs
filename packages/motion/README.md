# @justkits/motion

React 컴포넌트에 루프 애니메이션과 진입/퇴장 트랜지션을 CSS 기반으로 적용할 수 있는 모션 라이브러리다. `prefers-reduced-motion` 미디어 쿼리를 자동으로 처리한다.

## Contents

- [Installation](#installation)
- [How to use](#how-to-use)
  - [loop / useLoop](#loop--useloop)
  - [transition / useAnimatedExit](#transition--useanimatedexit)
- [Animations](#animations)
- [Token Types](#token-types)
- [Known Issues](#known-issues)

## Installation

```bash
pnpm add @justkits/motion
```

React 19 이상이 필요하다.

### keyframes.css 추가

앱에 포함되는 모든 `.css`와 `.tsx` 파일들 중에서 딱 한번만 `import`하면 된다.

- **앱에 `.css` 파일이 있다면**, 최상단 `.css` 파일에 `@import "@justkits/motion/keyframes.css"`를 선언한다.
- **앱에 `.css` 파일이 없다면** (CSS-in-JS 사용 등), 최상단 컴포넌트 파일인 `App.tsx`나 `main.tsx`에 (둘 다 있으면 `main.tsx`를 권장) `import "@justkits/motion/keyframes.css"`를 선언한다.

## How to use

### loop / useLoop

`loop()`는 루프 애니메이션에 필요한 CSS 속성 객체를 반환한다. `useLoop()`는 애니메이션의 시작/중단 상태를 관리하는 훅이다.

**Case 1: 인터랙션 없이 반복**

렌더링 시점부터 사용자 인터랙션 없이 반복 애니메이션을 적용하려면, `loop()`를 단독으로 사용한다.

```tsx
import { loop } from "@justkits/motion";

function Spinner() {
  return <div style={loop({ name: "rotate-cw" })}>⚙️</div>;
}
```

**Case 2: 인터랙션으로 시작/중단**

사용자 인터랙션에 의해 애니메이션이 시작되거나 끝나는 경우, `loop()`와 `useLoop()`를 함께 사용한다.

```tsx
import { loop, useLoop } from "@justkits/motion";

function Refresh() {
  const { isLooping, startAnimation, stopAnimation } = useLoop();

  // 새로고침이 완료되면 stopAnimation()을 호출하는 로직

  return (
    <form>
      <div style={loop({ name: "rotate-cw", isLooping })}>⚙️</div>
      <button onClick={startAnimation}>새로고침</button>
      <button onClick={stopAnimation} type="submit">
        취소
      </button>
    </form>
  );
}
```

`loop()` 옵션:

| 옵션         | 타입                     | 기본값                 | 설명                     |
| ------------ | ------------------------ | ---------------------- | ------------------------ |
| `name`       | `LoopAnimationNames`     | (필수)                 | 애니메이션 이름          |
| `duration`   | `AnimationDuration`      | `"normal"`             | 1사이클 기준 시간        |
| `delay`      | `AnimationDelay`         | `"short"`              | 시작 전 대기 시간        |
| `iterations` | `AnimationIterations`    | `"infinite"`           | 반복 횟수                |
| `easing`     | `AnimationEasingOptions` | 애니메이션별 자동 적용 | 이징 함수                |
| `isLooping`  | `boolean`                | `true`                 | `false`이면 빈 객체 반환 |

> `easing`을 지정하지 않으면 rotate 계열은 `linear`, bounce/swing은 `justkits-1`이 자동 적용된다.

`useLoop()` 반환값:

| 값               | 타입         | 설명                           |
| ---------------- | ------------ | ------------------------------ |
| `isLooping`      | `boolean`    | 현재 루프 애니메이션 진행 여부 |
| `startAnimation` | `() => void` | 루프 애니메이션을 시작         |
| `stopAnimation`  | `() => void` | 루프 애니메이션을 중단         |

---

### transition / useAnimatedExit

`transition()`은 진입/퇴장 애니메이션에 필요한 CSS 속성 객체를 반환한다. `useAnimatedExit()`은 퇴장 애니메이션을 실행하고, 컴포넌트를 dom에서 제거하는데 필요한 훅이다.

**Case 1: 진입 애니메이션만 사용**

진입 시에만 애니메이션이 필요한 경우, `transition()`을 단독으로 사용한다.

```tsx
import { transition } from "@justkits/motion";

function PopHello() {
  return (
    <div style={transition({ name: "pop" })}>
      <p>안녕하세요!</p>
    </div>
  );
}
```

**Case 2: 진입과 퇴장 애니메이션 모두 사용**

퇴장 시에도 애니메이션이 필요한 경우, `transition()`과 `useAnimatedExit()`을 함께 사용한다.

```tsx
import { useCallback, useState } from "react";
import { transition, useAnimatedExit } from "@justkits/motion";
import { Modal } from "@/components";

function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const { exiting, startClosing } = useAnimatedExit("normal", closeModal);

  return (
    <div>
      <button onClick={openModal}>눌러서 모달 열기</button>
      {isOpen && (
        <div style={transition({ name: "pop", exiting })}>
          <p>안녕하세요!</p>
          <button onClick={startClosing}>닫기</button>
        </div>
      )}
    </div>
  );
}
```

`transition()` 옵션:

| 옵션       | 타입                       | 기본값         | 설명                          |
| ---------- | -------------------------- | -------------- | ----------------------------- |
| `name`     | `TransitionAnimationNames` | (필수)         | 애니메이션 이름               |
| `exiting`  | `boolean`                  | `false`        | `true`이면 퇴장 키프레임 사용 |
| `duration` | `AnimationDuration`        | `"normal"`     | 애니메이션 지속 시간          |
| `delay`    | `AnimationDelay`           | `"short"`      | 시작 전 대기 시간             |
| `easing`   | `AnimationEasingOptions`   | `"justkits-1"` | 이징 함수                     |

`useAnimatedExit(duration, onClose?)` 반환값:

| 값             | 타입         | 설명                                               |
| -------------- | ------------ | -------------------------------------------------- |
| `exiting`      | `boolean`    | 현재 퇴장 애니메이션 진행 여부                     |
| `startClosing` | `() => void` | 퇴장 애니메이션을 시작하고, 완료 후 `onClose` 실행 |

> `startClosing()`은 애니메이션이 이미 진행 중이면 중복 호출을 무시한다.
>
> `onClose`가 렌더마다 새 함수로 전달되더라도 항상 최신 참조가 호출된다.

---

## Animations

### 루프 애니메이션 (`LoopAnimationNames`)

| 이름         | 설명                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| `rotate-cw`  | 시계 방향으로 계속 회전                                                                                  |
| `rotate-ccw` | 반시계 방향으로 계속 회전                                                                                |
| `bounce`     | 위로 튀어오르는 바운스. `duration` 기준으로 3.3배 스케일 적용. `easing` 옵션은 적용되지 않음 (아래 참고) |
| `swing`      | 좌우로 흔들리는 스윙. `duration` 기준으로 3.3배 스케일 적용. `easing` 옵션은 적용되지 않음 (아래 참고)   |

> `bounce`와 `swing`은 자연스러운 물리 감각을 위해 각 키프레임마다 이징이 직접 지정되어 있다. CSS 명세에 따라 키프레임 내부 이징이 컨테이너 이징을 덮어쓰므로, `easing` 옵션을 전달해도 실제 애니메이션에 반영되지 않는다.

### 트랜지션 애니메이션 (`TransitionAnimationNames`)

방향 이름은 **요소가 이동하는 방향**을 기준으로 한다. 예: `slide-up`은 요소가 아래에서 위로 올라오며 진입한다.

| 이름          | 진입 방향               | 퇴장 방향               |
| ------------- | ----------------------- | ----------------------- |
| `fade`        | 투명 → 불투명           | 불투명 → 투명           |
| `pop`         | 0.7배 → 1배 크기로 확대 | 1배 → 0.7배 크기로 축소 |
| `slide-up`    | 아래에서 위로           | 위에서 아래로           |
| `slide-down`  | 위에서 아래로           | 아래에서 위로           |
| `slide-left`  | 오른쪽에서 왼쪽으로     | 왼쪽에서 오른쪽으로     |
| `slide-right` | 왼쪽에서 오른쪽으로     | 오른쪽에서 왼쪽으로     |

---

## Token Types

### `AnimationDuration`

```ts
type AnimationDuration = "fast" | "normal" | "slow" | number;
```

트랜지션과 루프의 기준 시간이 다르다:

| 값         | 트랜지션    | 루프 (rotate) | 루프 (bounce/swing) |
| ---------- | ----------- | ------------- | ------------------- |
| `"fast"`   | 400ms       | 600ms         | 1,980ms             |
| `"normal"` | 600ms       | 800ms         | 2,640ms             |
| `"slow"`   | 800ms       | 1,000ms       | 3,300ms             |
| `number`   | 그대로 (ms) | 그대로 (ms)   | 3.3배 적용 (ms)     |

### `AnimationDelay`

```ts
type AnimationDelay = "none" | "short" | "medium" | "long" | number;
```

| 값         | 시간        |
| ---------- | ----------- |
| `"none"`   | 0ms         |
| `"short"`  | 100ms       |
| `"medium"` | 300ms       |
| `"long"`   | 500ms       |
| `number`   | 그대로 (ms) |

### `AnimationEasingOptions`

```ts
type AnimationEasingOptions =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "justkits-1" // cubic-bezier(0.4, 0, 0.2, 1)   — 표준 모션
  | "justkits-2"; // cubic-bezier(0.3, 0.8, 0.2, 1.3) — 오버슈트 포함
```

### `AnimationIterations`

```ts
type AnimationIterations = number | "infinite";
```

> `0` 이하 값을 전달하면 개발 환경에서 경고를 출력하고 `"infinite"`로 대체된다.
>
> `1`을 전달하면 루프되지 않는다는 경고가 출력된다.

---

## Future Considerations

### 인터랙티브 단발 애니메이션 API

마운트/언마운트와 무관하게, 이미 렌더링된 요소에 애니메이션을 명령형으로 실행할 수 있는 API가 없다. 폼 검증 실패 시 필드를 흔들거나, 알림 도착 시 아이콘을 울리거나, 버튼 클릭에 반응하는 피드백 애니메이션처럼 사용자 인터랙션에 의해 한 번 재생되는 패턴이 이에 해당한다.

현재 `loop()`의 `iterations` 옵션으로 비슷하게 흉내낼 수 있으나, 개발 환경 경고가 발생하고 의미상으로도 올바르지 않다. `animate()` / `useAnimate()`와 같은 별도 API가 필요하다.

```tsx
// animate() / useAnimate() 도입 후 (예시)
import { animate, useAnimate } from "@justkits/motion";

function SubmitButton() {
  const { playing, play } = useAnimate();

  return (
    <button style={animate({ name: "shake", playing })} onClick={play}>
      제출
    </button>
  );
}
```

### `useAnimatedMount` 훅

현재 진입/퇴장 애니메이션을 사용하려면 `isOpen` 상태 관리와 `useAnimatedExit()` 연결을 직접 구현해야 한다. 이 패턴을 하나의 훅으로 추상화하면 가장 흔한 사용 사례를 훨씬 간결하게 처리할 수 있다.

```tsx
// 현재
const [isOpen, setIsOpen] = useState(false);
const { exiting, startClosing } = useAnimatedExit("normal", () =>
  setIsOpen(false),
);
{
  isOpen && <div style={transition({ name: "pop", exiting })}>...</div>;
}

// useAnimatedMount 도입 후 (예시)
const { mounted, exiting, open, close } = useAnimatedMount("normal");
{
  mounted && <div style={transition({ name: "pop", exiting })}>...</div>;
}
```

### 퇴장 애니메이션 취소

`startClosing()`은 한 번 호출하면 되돌릴 수 없다. 닫기 애니메이션 도중 다시 열기를 시도하는 경우처럼, 진행 중인 퇴장 애니메이션을 중단하고 원래 상태로 되돌리는 `cancelClosing()` API가 필요할 수 있다.

### 스태거 애니메이션

리스트나 메뉴 항목을 순차적으로 등장시킬 때, 각 항목마다 `delay`를 직접 계산해서 전달해야 한다. 인덱스를 기반으로 지연 시간을 자동으로 산출하는 `stagger()` 유틸리티를 추가하면 이 패턴을 간편하게 처리할 수 있다.

```tsx
// stagger() 도입 후 (예시)
items.map((item, i) => (
  <div style={transition({ name: "slide-up", delay: stagger(i) })}>{item}</div>
));
```

### 소스맵

현재 빌드 설정에 소스맵이 포함되어 있지 않다. 소스맵을 추가하면 컨슈머 앱의 디버깅 경험이 개선된다.

### SSR `useReducedMotion` 초기값 지원

현재 알려진 문제인 하이드레이션 불일치를 코드 레벨에서 해결하려면, `useReducedMotion(initialValue?)` 형태로 서버에서 전달받은 초기값을 주입할 수 있어야 한다. 이를 통해 서버와 클라이언트의 초기 렌더 결과를 일치시킬 수 있다.

---

## Known Issues

### SSR 환경에서 `useReducedMotion` 하이드레이션 불일치

`useReducedMotion`은 서버에서 `window`를 사용할 수 없으므로 초기값을 `false`로 설정한다. 사용자가 OS에서 `prefers-reduced-motion: reduce`를 활성화한 경우, 클라이언트는 `false`로 하이드레이션된 직후 `true`로 전환된다. 이 때 한 프레임 동안 애니메이션 스타일이 적용되었다가 제거되는 플래시가 발생할 수 있다.

**우회 방법:** 서버에서 사용자의 모션 설정을 쿠키나 헤더로 전달받아, 초기 렌더링 시 `useReducedMotion()`에만 의존하지 않도록 한다.
