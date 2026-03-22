# @justkits/feedback

명령형 API로 알림 및 확인 다이얼로그를 표시하는 피드백 UI 패키지다. React 컨텍스트 없이 어디서든 호출할 수 있으며, `<Alerter />`가 마운트된 위치에서 렌더된다.

## Requirements

- React 19 이상

## Installation

```sh
pnpm add @justkits/feedback
```

---

## Quick Start

앱 루트에 `<Alerter />`를 마운트하고, `renderAlert` / `renderConfirm`으로 UI를 직접 구성한다.

```tsx
import { Alerter } from "@justkits/feedback";
import { Alert } from "@justkits/headless-ui";

function App() {
  return (
    <>
      <Alerter
        renderAlert={(alert, closeAlert) => (
          <Alert
            title={alert.title}
            message={alert.message}
            closeAlert={closeAlert}
          >
            <Alert.Overlay>
              <Alert.Content>
                <Alert.Title />
                <Alert.Message />
                <Alert.Buttons>
                  <Alert.Button
                    buttonText={alert.closeText ?? "Close"}
                    onClick={alert.onClose}
                  />
                </Alert.Buttons>
              </Alert.Content>
            </Alert.Overlay>
          </Alert>
        )}
        renderConfirm={(confirm, closeAlert) => (
          <Alert
            title={confirm.title}
            message={confirm.message}
            closeAlert={closeAlert}
          >
            <Alert.Overlay>
              <Alert.Content>
                <Alert.Title />
                <Alert.Message />
                <Alert.Buttons>
                  <Alert.Button
                    buttonText={confirm.cancelText ?? "Cancel"}
                    onClick={confirm.onCancel}
                  />
                  <Alert.Button
                    buttonText={confirm.confirmText ?? "Confirm"}
                    onClick={confirm.onConfirm}
                  />
                </Alert.Buttons>
              </Alert.Content>
            </Alert.Overlay>
          </Alert>
        )}
      />
      {/* 나머지 앱 */}
    </>
  );
}
```

마운트 후에는 컴포넌트 트리 어디서든 명령형으로 호출한다.

```ts
import { showAlert, showConfirm } from "@justkits/feedback";

// 단순 알림
showAlert("제목", "내용");

// 확인 다이얼로그
showConfirm("삭제하시겠습니까?", "이 작업은 되돌릴 수 없습니다.", () => {
  handleDelete();
});
```

---

## Feature Specification

### Alert vs Confirm

- [x] **Alert**: 단순 알림. 확인 버튼 하나로 닫힌다. `onClose` 콜백은 선택 사항이다.
- [x] **Confirm**: 확인/취소 두 가지 선택지를 제공한다. `onConfirm`은 필수, `onCancel`은 선택 사항이다.

### State Management

- [x] **한 번에 하나의 알림**: 이미 알림이 활성화된 상태에서 추가 호출이 들어오면 무시된다. 개발 환경에서는 경고 메시지가 출력되며, 프로덕션에서는 조용히 무시된다.
- [x] **마운트 감지**: `<Alerter />`가 마운트되지 않은 상태에서 호출하면 경고가 출력된다.

---

## Known Issues

### SSR 및 다중 React 루트 미지원

`alerterMounted`와 `alertActive`는 모듈 레벨 전역 변수다. 이로 인해 두 가지 제약이 있다:

- **SSR**: `document` 객체가 없는 서버 환경에서는 `showAlert()` / `showConfirm()` 호출 시 런타임 오류가 발생한다.
- **다중 React 루트**: 한 페이지에 `ReactDOM.createRoot()`로 생성된 루트가 여럿 존재하는 경우, 전역 상태를 공유하므로 루트 간 충돌이 발생할 수 있다.

이 패키지는 단일 SPA(Single Page Application) 환경을 전제로 설계되었다.
