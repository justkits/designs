import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { Tooltip } from "@/Tooltip";
import { setupConsoleSpy, setupSSR, setupTimer } from "../_setup";
import { TestComponent } from "./_setup";

describe("Tooltip - structure", () => {
  setupTimer();
  const { warnSpy } = setupConsoleSpy("development");

  describe("SSR environment", () => {
    setupSSR();

    it("renders in-place when portal prop is set (portal bypassed before mount)", () => {
      // window/document가 없는 SSR 환경에서는 useSyncExternalStore가 서버 스냅샷(false)을 사용하므로
      // portal 모드이더라도 children이 인라인으로 렌더링되어 hydration mismatch를 방지한다.
      const html = renderToString(<TestComponent portal mode="always-open" />);

      expect(html).toContain('data-testid="tooltip-trigger"');
      expect(html).toContain('data-testid="tooltip-content"');
      expect(html).toContain('data-testid="tooltip-message"');
      expect(html).toContain('data-testid="tooltip-arrow"');
    });
  });

  it("supports portal mode", () => {
    // portal 모드에서는, content가 document.body에 렌더링되어야 한다.
    const { getByTestId } = render(<TestComponent mode="always-open" portal />);

    expect(getByTestId("tooltip-content").parentElement).toBe(document.body);

    // trigger는 portal 안에 포함되지 않는다.
    expect(getByTestId("tooltip-trigger").parentElement).not.toBe(
      document.body,
    );
  });

  describe("Tooltip.Content", () => {
    it("must be used within the Tooltip wrapper", () => {
      expect(() => render(<Tooltip.Content>Content</Tooltip.Content>)).toThrow(
        "Tooltip Components must be used within the Tooltip wrapper",
      );
    });

    it("renders in place when portal prop is not set", () => {
      const { getByTestId } = render(<TestComponent mode="always-open" />);

      expect(getByTestId("tooltip-content").parentElement).not.toBe(
        document.body,
      );
    });
  });

  describe("Tooltip.Message", () => {
    it("must be used within Tooltip.Content", () => {
      expect(() =>
        render(
          <Tooltip>
            <Tooltip.Message>Message</Tooltip.Message>
          </Tooltip>,
        ),
      ).toThrow("Tooltip.Message must be used within Tooltip.Content");
    });

    it("should support `asChild` property", () => {
      const { container, getByText } = render(
        <Tooltip isOpen>
          <Tooltip.Content>
            <Tooltip.Message asChild>
              <span>Custom Message</span>
            </Tooltip.Message>
          </Tooltip.Content>
        </Tooltip>,
      );

      const customMessage = getByText("Custom Message");
      expect(customMessage).toBeTruthy();
      expect(customMessage.tagName).toBe("SPAN");
      expect(container.querySelector("p")).toBeNull();
    });
  });

  describe("Tooltip.Arrow", () => {
    it("must be used within Tooltip.Content", () => {
      expect(() =>
        render(
          <Tooltip>
            <Tooltip.Arrow />
          </Tooltip>,
        ),
      ).toThrow("Tooltip.Arrow must be used within Tooltip.Content");
    });
  });

  describe("Tooltip.Trigger", () => {
    it("must be used within the Tooltip wrapper", () => {
      expect(() => render(<Tooltip.Trigger>Trigger</Tooltip.Trigger>)).toThrow(
        "Tooltip Components must be used within the Tooltip wrapper",
      );
    });

    it("should render outside Tooltip.Content", () => {
      // 그렇지 않으면 dev mode에서 경고를 콘솔에 출력한다.
      render(
        <Tooltip isOpen>
          <Tooltip.Content>
            <Tooltip.Trigger>Trigger</Tooltip.Trigger>
          </Tooltip.Content>
        </Tooltip>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Tooltip.Trigger should be rendered outside of Tooltip.Content. Please move Tooltip.Trigger outside of Tooltip.Content to avoid unexpected behavior.",
      );
    });

    it("should support `asChild` property", () => {
      const { container, getByText } = render(
        <Tooltip isOpen>
          <Tooltip.Trigger asChild>
            <button>Custom Trigger</button>
          </Tooltip.Trigger>
        </Tooltip>,
      );

      const customTrigger = getByText("Custom Trigger");
      expect(customTrigger).toBeTruthy();
      expect(customTrigger.tagName).toBe("BUTTON");
      expect(container.querySelectorAll("button")).toHaveLength(1);
    });
  });
});
