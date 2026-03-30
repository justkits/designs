import { Alert } from "@/Alert";

export function TestComponent({
  omit = undefined,
  isOpen,
  portal = false,
  onClose,
}: Readonly<{
  omit?: "trigger" | "overlay" | "content" | "title" | "message" | "button";
  isOpen?: boolean;
  portal?: boolean;
  onClose?: () => void | Promise<void>;
}>) {
  return (
    <>
      <Alert isOpen={isOpen} portal={portal}>
        {omit !== "trigger" && (
          <Alert.Trigger data-testid="alert-trigger">트리거</Alert.Trigger>
        )}
        {omit !== "overlay" && <Alert.Overlay data-testid="alert-overlay" />}
        {omit !== "content" && (
          <Alert.Content data-testid="alert-content">
            {omit !== "title" && (
              <Alert.Title data-testid="alert-title">알림 제목</Alert.Title>
            )}
            {omit !== "message" && (
              <Alert.Message data-testid="alert-description">
                알림 메시지
              </Alert.Message>
            )}
            {omit !== "button" && (
              <Alert.Button data-testid="alert-button" onClick={onClose}>
                확인
              </Alert.Button>
            )}
          </Alert.Content>
        )}
      </Alert>
      <div data-testid="outside-element">외부 요소</div>
    </>
  );
}
