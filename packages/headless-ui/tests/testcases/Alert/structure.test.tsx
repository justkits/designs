import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { Alert } from "@/Alert";
import { setupConsoleSpy, setupSSR } from "../_setup";
import { TestComponent } from "./_setup";

describe("Alert - structure", () => {
  const { warnSpy } = setupConsoleSpy("development");

  describe("SSR environment", () => {
    setupSSR();

    it("renders in-place when portal prop is set (portal bypassed before mount)", () => {
      // window/document가 없는 SSR 환경에서는 useSyncExternalStore가 서버 스냅샷(false)을 사용하므로
      // portal 모드이더라도 children이 인라인으로 렌더링되어 hydration mismatch를 방지한다.
      const html = renderToString(<TestComponent isOpen portal />);

      expect(html).toContain('data-testid="alert-content"');
      expect(html).toContain('data-testid="alert-overlay"');
    });
  });

  it("supports portal mode", () => {
    // portal 모드에서는, content와 overlay가 document.body에 렌더링되어야 한다.
    const { getByTestId } = render(<TestComponent isOpen portal />);

    expect(getByTestId("alert-content").parentElement).toBe(document.body);
    expect(getByTestId("alert-overlay").parentElement).toBe(document.body);

    // trigger는 portal 안에 포함되지 않는다.
    expect(getByTestId("alert-trigger").parentElement).not.toBe(document.body);
  });

  describe("Alert.Content", () => {
    it("must be used within the Alert wrapper", () => {
      expect(() => render(<Alert.Content>Example</Alert.Content>)).toThrow(
        "Alert Components must be used within the Alert wrapper",
      );
    });

    it("renders in place when portal prop is not set", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      expect(getByTestId("alert-content").parentElement).not.toBe(
        document.body,
      );
    });
  });

  describe("Alert.Title", () => {
    it("must be used within Alert.Content", () => {
      expect(() =>
        render(
          <Alert>
            <Alert.Title>Example</Alert.Title>
          </Alert>,
        ),
      ).toThrow("Alert.Title must be used within Alert.Content");
    });

    it("should support `asChild` property", () => {
      const { getByText, container } = render(
        <Alert isOpen>
          <Alert.Content>
            <Alert.Title asChild>
              <h1>Title</h1>
            </Alert.Title>
            <Alert.Button>OK</Alert.Button>
          </Alert.Content>
        </Alert>,
      );

      const title = getByText("Title");
      expect(title.tagName).toBe("H1");
      expect(title.id).toBeTruthy();
      expect(container.querySelector("h2")).toBeNull();
    });
  });

  describe("Alert.Message", () => {
    it("must be used within Alert.Content", () => {
      expect(() =>
        render(
          <Alert>
            <Alert.Message>Example</Alert.Message>
          </Alert>,
        ),
      ).toThrow("Alert.Message must be used within Alert.Content");
    });

    it("should support `asChild` property", () => {
      const { getByText, container } = render(
        <Alert isOpen>
          <Alert.Content>
            <Alert.Title>Title</Alert.Title>
            <Alert.Message asChild>
              <span>Message</span>
            </Alert.Message>
            <Alert.Button>OK</Alert.Button>
          </Alert.Content>
        </Alert>,
      );

      const message = getByText("Message");
      expect(message.tagName).toBe("SPAN");
      expect(message.id).toBeTruthy();
      expect(container.querySelector("p")).toBeNull();
    });
  });

  describe("Alert.Button", () => {
    it("must be used within Alert.Content", () => {
      expect(() =>
        render(
          <Alert>
            <Alert.Button>Example</Alert.Button>
          </Alert>,
        ),
      ).toThrow("Alert.Button must be used within Alert.Content");
    });

    it("should support `asChild` property", () => {
      const { container } = render(
        <Alert isOpen>
          <Alert.Content>
            <Alert.Title>Title</Alert.Title>
            <Alert.Button asChild>
              <button>OK</button>
            </Alert.Button>
          </Alert.Content>
        </Alert>,
      );

      expect(container.querySelectorAll("button")).toHaveLength(1);
    });
  });

  describe("Alert.Trigger", () => {
    it("must be used within the Alert wrapper", () => {
      expect(() => render(<Alert.Trigger>Example</Alert.Trigger>)).toThrow(
        "Alert Components must be used within the Alert wrapper",
      );
    });

    it("should render outside Alert.Content", () => {
      // 그렇지 않으면 dev mode에서는 경고를 콘솔에 출력된다.
      render(
        <Alert isOpen portal>
          <Alert.Content data-testid="alert-content">
            <Alert.Trigger data-testid="alert-trigger">Open</Alert.Trigger>
            <Alert.Title>Title</Alert.Title>
            <Alert.Button>OK</Alert.Button>
          </Alert.Content>
        </Alert>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Alert.Trigger should be rendered outside of Alert.Content. Please move Alert.Trigger outside of Alert.Content to avoid unexpected behavior.",
      );
    });

    it("should support `asChild` property", () => {
      const { getByText, container } = render(
        <Alert data-testid="alert">
          <Alert.Trigger asChild>
            <button>Open Alert</button>
          </Alert.Trigger>
        </Alert>,
      );
      const button = getByText("Open Alert");
      expect(button.getAttribute("aria-haspopup")).toBe("dialog");
      expect(button.getAttribute("aria-controls")).toBeTruthy();

      expect(container.querySelectorAll("button")).toHaveLength(1);
    });
  });

  describe("Alert.Overlay", () => {
    it("must be used within the Alert wrapper", () => {
      expect(() => render(<Alert.Overlay />)).toThrow(
        "Alert Components must be used within the Alert wrapper",
      );
    });

    it("should render outside Alert.Content", () => {
      // 그렇지 않으면 dev mode에서는 경고를 콘솔에 출력된다.
      render(
        <Alert isOpen portal>
          <Alert.Content data-testid="alert-content">
            <Alert.Overlay data-testid="alert-overlay" />
            <Alert.Title>Title</Alert.Title>
            <Alert.Button>OK</Alert.Button>
          </Alert.Content>
        </Alert>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Alert.Overlay should be rendered outside of Alert.Content. Please move Alert.Overlay outside of Alert.Content to avoid unexpected behavior.",
      );
    });
  });
});
