import { useState } from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";

import { Alert } from "@/Alert";
import { setupConsoleSpy } from "../_setup";
import { TestComponent } from "./_setup";

describe("Alert - interactions", () => {
  setupConsoleSpy("development");

  describe("Clicks", () => {
    it("trigger click opens the alert, button click closes it", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // 초기에는 Alert.Content가 렌더링되지 않아야 한다.
      expect(queryByTestId("alert-content")).toBeNull();

      // Alert.Trigger를 클릭하여 Alert를 연다.
      fireEvent.click(getByTestId("alert-trigger"));
      expect(getByTestId("alert-content")).toBeTruthy();

      // Alert.Button을 클릭하여 Alert를 닫는다.
      await act(async () => {
        fireEvent.click(getByTestId("alert-button"));
      });
      await waitFor(() => expect(queryByTestId("alert-content")).toBeNull());
    });

    it("overlay click does not close the alert", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // Alert.Trigger를 클릭하여 Alert를 연다.
      fireEvent.click(getByTestId("alert-trigger"));

      // Overlay를 클릭해도 Alert는 닫히지 않아야 한다.
      fireEvent.click(getByTestId("alert-overlay"));
      expect(queryByTestId("alert-content")).toBeTruthy();
    });
  });

  describe("Keyboard", () => {
    it("escape key does not close the alert", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // 트리거를 클릭하여 Alert를 연다.
      fireEvent.click(getByTestId("alert-trigger"));

      // Escape 키를 눌러도 Alert는 닫히지 않아야 한다.
      fireEvent.keyDown(getByTestId("alert-content"), { key: "Escape" });
      expect(queryByTestId("alert-content")).toBeTruthy();
    });
  });

  describe("Focus", () => {
    describe("Initial Focus", () => {
      it("focuses the first focusable element when alert opens", () => {
        const { getByTestId } = render(<TestComponent />);

        // Alert.Trigger를 클릭하여 Alert를 연다.
        fireEvent.click(getByTestId("alert-trigger"));

        // Alert.Content 내의 첫 번째 focusable 요소에 포커스가 가야 한다. (Alert.Button)
        expect(document.activeElement).toBe(getByTestId("alert-button"));
      });

      it("focuses Alert.Content itself when there are no focusable elements", () => {
        // Button이 없는 Alert를 렌더링한다.
        const { getByTestId } = render(
          <Alert isOpen>
            <Alert.Content data-testid="content">
              <Alert.Title>Title</Alert.Title>
            </Alert.Content>
          </Alert>,
        );

        // Alert.Content에 포커스가 가야 한다.
        expect(document.activeElement).toBe(getByTestId("content"));

        // 이 상태에서 Tab 키를 눌러도 포커스가 Alert.Content에 머물러야 한다.
        fireEvent.keyDown(getByTestId("content"), { key: "Tab" });
        expect(document.activeElement).toBe(getByTestId("content"));

        // Shift+Tab 키를 눌러도 포커스가 Alert.Content에 머물러야 한다.
        fireEvent.keyDown(getByTestId("content"), {
          key: "Tab",
          shiftKey: true,
        });
        expect(document.activeElement).toBe(getByTestId("content"));
      });
    });

    describe("Focus Trap", () => {
      it("Tab/Shift+Tab cycles focus within Alert.Content and cannot escape", () => {
        const { getByTestId } = render(
          <Alert>
            <Alert.Trigger data-testid="trigger">Open</Alert.Trigger>
            <Alert.Content>
              <Alert.Title>Title</Alert.Title>
              <Alert.Button data-testid="btn-1">Button 1</Alert.Button>
              <Alert.Button data-testid="btn-2">Button 2</Alert.Button>
              <Alert.Button data-testid="btn-3">Button 3</Alert.Button>
            </Alert.Content>
          </Alert>,
        );

        // Alert를 연다.
        fireEvent.click(getByTestId("trigger"));

        // 마지막 버튼에 포커스가 있는 상태에서 Tab 키를 누르면 첫 번째 버튼으로 포커스가 이동해야 한다.
        getByTestId("btn-3").focus();
        fireEvent.keyDown(getByTestId("btn-3"), { key: "Tab" });
        expect(document.activeElement).toBe(getByTestId("btn-1"));

        // 첫 번째 버튼에 포커스가 있는 상태에서 Shift+Tab 키를 누르면 마지막 버튼으로 포커스가 이동해야 한다.
        getByTestId("btn-1").focus();
        fireEvent.keyDown(getByTestId("btn-1"), { key: "Tab", shiftKey: true });
        expect(document.activeElement).toBe(getByTestId("btn-3"));
      });
    });

    describe("Return Focus", () => {
      it("returns focus to Alert.Trigger when alert closes", async () => {
        const { getByTestId } = render(<TestComponent />);

        // Alert.Trigger를 클릭하여 Alert를 연다.
        const trigger = getByTestId("alert-trigger");
        fireEvent.click(trigger);

        // Alert.Button을 클릭하여 Alert를 닫는다. 닫으면 Alert.Trigger로 포커스가 돌아와야 한다.
        await act(async () => {
          fireEvent.click(getByTestId("alert-button"));
        });
        expect(document.activeElement).toBe(trigger);
      });

      it("returns focus to the previously focused element when there is no trigger", async () => {
        function FocusTrapTest() {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <>
              <button
                data-testid="outside-focusable-element"
                onClick={() => setIsOpen(true)}
              >
                외부 포커스 가능 요소
              </button>
              <Alert isOpen={isOpen} onOpenChange={setIsOpen}>
                <Alert.Content data-testid="alert-content">
                  <Alert.Title>Title</Alert.Title>
                  <Alert.Button data-testid="alert-button">OK</Alert.Button>
                </Alert.Content>
              </Alert>
            </>
          );
        }

        const { getByTestId } = render(<FocusTrapTest />);

        // 처음에 외부 포커스 가능 요소에 포커스를 준다.
        const external = getByTestId("outside-focusable-element");
        external.focus();

        // 클릭하여 Alert를 연다.
        fireEvent.click(external);

        // Alert.Button을 클릭하여 Alert를 닫는다. 닫으면 외부 포커스 가능 요소로 포커스가 돌아와야 한다.
        await act(async () => {
          fireEvent.click(getByTestId("alert-button"));
        });
        expect(document.activeElement).toBe(external);
      });
    });
  });

  describe("Others", () => {
    it("background scroll is locked while open and restored on close", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);
      fireEvent.click(getByTestId("alert-trigger"));
      expect(document.body.style.overflow).toBe("hidden");

      await act(async () => {
        fireEvent.click(getByTestId("alert-button"));
      });
      await waitFor(() => expect(queryByTestId("alert-content")).toBeNull());
      expect(document.body.style.overflow).not.toBe("hidden");
    });

    describe("Async Button Actions", () => {
      it("stays open while pending and sets correct properties", async () => {
        let resolveAction!: () => void;
        const onClose = () =>
          new Promise<void>((r) => {
            resolveAction = r;
          });
        const { getByTestId } = render(<TestComponent onClose={onClose} />);

        fireEvent.click(getByTestId("alert-trigger"));
        fireEvent.click(getByTestId("alert-button"));

        const content = getByTestId("alert-content");

        expect(
          (getByTestId("alert-button") as HTMLButtonElement).disabled,
        ).toBe(true);
        expect(
          (getByTestId("alert-button") as HTMLButtonElement).disabled,
        ).toBe(true);
        expect(content.getAttribute("aria-busy")).toBe("true");

        await act(async () => {
          resolveAction();
        });
      });

      it("closes on resolve", async () => {
        let resolveAction!: () => void;
        const onClose = () =>
          new Promise<void>((r) => {
            resolveAction = r;
          });
        const { getByTestId, queryByTestId } = render(
          <TestComponent onClose={onClose} />,
        );

        fireEvent.click(getByTestId("alert-trigger"));
        fireEvent.click(getByTestId("alert-button"));

        await act(async () => {
          resolveAction();
        });
        expect(queryByTestId("alert-content")).toBeNull();
      });

      it("stays open on reject", async () => {
        const onClose = () => Promise.reject(new Error("failed"));
        const { getByTestId, queryByTestId } = render(
          <TestComponent onClose={onClose} />,
        );

        fireEvent.click(getByTestId("alert-trigger"));
        await act(async () => {
          fireEvent.click(getByTestId("alert-button"));
        });
        expect(queryByTestId("alert-content")).toBeTruthy();
      });
    });
  });
});
