import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { Toast } from "@/Toast";
import { setupConsoleSpy, setupSSR } from "../_setup";
import { TestComponent } from "./_setup";

describe("Toast - structure", () => {
  const { warnSpy } = setupConsoleSpy("development");

  describe("SSR environment", () => {
    setupSSR();

    it("renders in-place when portal prop is set (portal bypassed before mount)", () => {
      // window/document가 없는 SSR 환경에서는 useSyncExternalStore가 서버 스냅샷(false)을 사용하므로
      // portal 모드이더라도 children이 인라인으로 렌더링되어 hydration mismatch를 방지한다.
      const html = renderToString(<TestComponent isOpen portal />);

      expect(html).toContain('data-testid="toast-trigger"');
    });
  });

  it("supports portal mode", () => {
    // portal 모드에서는, content가 document.body에 렌더링되어야 한다.
    const { getByTestId } = render(<TestComponent isOpen portal />);

    expect(getByTestId("toast-content").parentElement).toBe(document.body);

    // trigger는 portal 안에 포함되지 않는다.
    expect(getByTestId("toast-trigger").parentElement).not.toBe(document.body);
  });

  describe("Toast.Content", () => {
    it("must be used within the Toast wrapper", () => {
      expect(() => render(<Toast.Content>Example</Toast.Content>)).toThrow(
        "Toast Components must be used within the Toast wrapper",
      );
    });

    it("renders in place when portal prop is not set", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      expect(getByTestId("toast-content").parentElement).not.toBe(
        document.body,
      );
    });
  });

  describe("Toast.Message", () => {
    it("must be used within Toast.Content", () => {
      expect(() =>
        render(
          <Toast>
            <Toast.Message>Message</Toast.Message>
          </Toast>,
        ),
      ).toThrow("Toast.Message must be used within Toast.Content");
    });

    it("should support asChild prop", () => {
      const { getByTestId } = render(
        <Toast isOpen>
          <Toast.Content>
            <Toast.Message asChild data-testid="custom-message">
              <span>Custom Message</span>
            </Toast.Message>
          </Toast.Content>
        </Toast>,
      );

      const customMessage = getByTestId("custom-message");
      expect(customMessage).toBeTruthy();
      expect(customMessage.tagName).toBe("SPAN");
    });
  });

  describe("Toast.Close", () => {
    it("must be used within Toast.Content", () => {
      expect(() =>
        render(
          <Toast>
            <Toast.Close>Close</Toast.Close>
          </Toast>,
        ),
      ).toThrow("Toast.Close must be used within Toast.Content");
    });

    it("should support asChild prop", () => {
      const { getByTestId } = render(
        <Toast isOpen>
          <Toast.Content>
            <Toast.Close asChild data-testid="custom-close">
              <button>Custom Close</button>
            </Toast.Close>
          </Toast.Content>
        </Toast>,
      );

      const customClose = getByTestId("custom-close");
      expect(customClose).toBeTruthy();
      expect(customClose.tagName).toBe("BUTTON");
    });
  });

  describe("Toast.Trigger", () => {
    it("must be used within the Toast wrapper", () => {
      expect(() => render(<Toast.Trigger>Trigger</Toast.Trigger>)).toThrow(
        "Toast Components must be used within the Toast wrapper",
      );
    });

    it("should render outside Toast.Content", () => {
      // 그렇지 않으면 dev mode에서는 경고를 콘솔에 출력된다.
      render(
        <Toast isOpen>
          <Toast.Content data-testid="toast-content">
            <Toast.Trigger data-testid="toast-trigger">Trigger</Toast.Trigger>
          </Toast.Content>
        </Toast>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Toast.Trigger should be rendered outside of Toast.Content. Please move Toast.Trigger outside of Toast.Content.",
      );
    });

    it("should support `asChild` property", () => {
      const { getByText } = render(
        <Toast>
          <Toast.Trigger asChild>
            <button>Trigger</button>
          </Toast.Trigger>
        </Toast>,
      );

      const trigger = getByText("Trigger");
      expect(trigger.tagName).toBe("BUTTON");
    });
  });
});
