import { fireEvent, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { Popover } from "@/Popover";
import { setupConsoleSpy, setupSSR } from "../_setup";
import { AlwaysOpenTestComponent, TestComponent } from "./_setup";

describe("Popover - structure", () => {
  const { warnSpy } = setupConsoleSpy("development");

  describe("SSR environment", () => {
    setupSSR();

    it("renders in-place when portal prop is set (portal bypassed before mount)", () => {
      // window/document가 없는 SSR 환경에서는 useSyncExternalStore가 서버 스냅샷(false)을 사용하므로
      // portal 모드이더라도 children이 인라인으로 렌더링되어 hydration mismatch를 방지한다.
      const html = renderToString(<AlwaysOpenTestComponent portal />);

      expect(html).toContain('data-testid="popover-trigger"');
    });
  });

  it("supports portal mode", () => {
    // portal 모드에서는, content가 document.body에 렌더링되어야 한다.
    const { getByTestId } = render(<TestComponent portal />);

    fireEvent.click(getByTestId("popover-trigger"));

    expect(getByTestId("popover-content").parentElement).toBe(document.body);

    // trigger는 portal 안에 포함되지 않는다.
    expect(getByTestId("popover-trigger").parentElement).not.toBe(
      document.body,
    );
  });

  describe("Popover.Content", () => {
    it("must be used within the Popover wrapper", () => {
      expect(() => render(<Popover.Content>Example</Popover.Content>)).toThrow(
        "Popover Components must be used within the Popover wrapper",
      );
    });

    it("renders in place when portal prop is not set", () => {
      const { getByTestId } = render(<TestComponent />);

      fireEvent.click(getByTestId("popover-trigger"));

      expect(getByTestId("popover-content").parentElement).not.toBe(
        document.body,
      );
    });
  });

  describe("Popover.Title", () => {
    it("must be used within Popover.Content", () => {
      expect(() =>
        render(
          <Popover>
            <Popover.Title>Title</Popover.Title>
          </Popover>,
        ),
      ).toThrow("Popover.Title must be used within Popover.Content");
    });

    it("should support `asChild` property", () => {
      const { getByText, container } = render(
        <Popover isOpen onOpenChange={() => {}}>
          <Popover.Content>
            <Popover.Title asChild>
              <h1>Title</h1>
            </Popover.Title>
          </Popover.Content>
        </Popover>,
      );

      const title = getByText("Title");
      expect(title.tagName).toBe("H1");
      expect(title.id).toBeTruthy();
      expect(container.querySelector("h2")).toBeNull();
    });
  });

  describe("Popover.Close", () => {
    it("must be used within Popover.Content", () => {
      expect(() =>
        render(
          <Popover>
            <Popover.Close>닫기</Popover.Close>
          </Popover>,
        ),
      ).toThrow("Popover.Close must be used within Popover.Content");
    });

    it("should support `asChild` property", () => {
      const { container } = render(
        <Popover isOpen onOpenChange={() => {}}>
          <Popover.Content>
            <Popover.Close asChild>
              <button>닫기</button>
            </Popover.Close>
          </Popover.Content>
        </Popover>,
      );

      expect(container.querySelectorAll("button")).toHaveLength(1);
    });
  });

  describe("Popover.Arrow", () => {
    it("must be used within Popover.Content", () => {
      expect(() =>
        render(
          <Popover>
            <Popover.Arrow />
          </Popover>,
        ),
      ).toThrow("Popover.Arrow must be used within Popover.Content");
    });
  });

  describe("Popover.Trigger", () => {
    it("must be used within the Popover wrapper", () => {
      expect(() => render(<Popover.Trigger>트리거</Popover.Trigger>)).toThrow(
        "Popover Components must be used within the Popover wrapper",
      );
    });

    it("should render outside Popover.Content", () => {
      // 그렇지 않으면 dev mode에서는 경고를 콘솔에 출력된다.
      render(
        <Popover isOpen onOpenChange={() => {}}>
          <Popover.Content data-testid="popover-content">
            <Popover.Trigger data-testid="popover-trigger">
              트리거
            </Popover.Trigger>
          </Popover.Content>
        </Popover>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Popover.Trigger should be rendered outside of Popover.Content. Please move Popover.Trigger outside of Popover.Content to avoid unexpected behavior.",
      );
    });

    it("should support `asChild` property", () => {
      const { getByText, container } = render(
        <Popover>
          <Popover.Trigger asChild>
            <button>트리거</button>
          </Popover.Trigger>
        </Popover>,
      );

      const trigger = getByText("트리거");
      expect(trigger.tagName).toBe("BUTTON");
      expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
      expect(container.querySelectorAll("button")).toHaveLength(1);
    });
  });
});
