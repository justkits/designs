import { fireEvent, render, waitFor } from "@testing-library/react";

import { Popover } from "@/Popover";
import { setupConsoleSpy } from "../_setup";
import { TestComponent } from "./_setup";

describe("Popover - interactions", () => {
  setupConsoleSpy("development");

  describe("Clicks", () => {
    it("trigger click opens the popover", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // 초기에는 Popover.Content가 렌더링되지 않아야 한다.
      expect(queryByTestId("popover-content")).toBeNull();

      fireEvent.click(getByTestId("popover-trigger"));
      expect(getByTestId("popover-content")).toBeTruthy();
    });

    it("clicking outside closes the popover", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      fireEvent.click(getByTestId("popover-trigger"));
      expect(getByTestId("popover-content")).toBeTruthy();

      // content를 클릭하면 닫히면 안 된다.
      fireEvent.mouseDown(getByTestId("popover-content"));
      expect(getByTestId("popover-content")).toBeTruthy();

      fireEvent.mouseDown(getByTestId("outside-element"));
      expect(queryByTestId("popover-content")).toBeNull();
    });

    it("Popover.Close click closes the popover", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      fireEvent.click(getByTestId("popover-trigger"));
      expect(getByTestId("popover-content")).toBeTruthy();

      fireEvent.click(getByTestId("popover-button"));
      await waitFor(() => expect(queryByTestId("popover-content")).toBeNull());
    });
  });

  describe("Keyboard", () => {
    it("Escape key closes the popover", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      fireEvent.click(getByTestId("popover-trigger"));
      expect(getByTestId("popover-content")).toBeTruthy();

      fireEvent.keyDown(getByTestId("popover-content"), { key: "Escape" });
      expect(queryByTestId("popover-content")).toBeNull();
    });

    it("Tab/Shift+Tab cycles focus within Popover.Content and cannot escape", async () => {
      const { getByTestId } = render(
        <Popover>
          <Popover.Trigger data-testid="trigger">트리거</Popover.Trigger>
          <Popover.Content>
            <Popover.Close data-testid="btn-1">버튼 1</Popover.Close>
            <Popover.Close data-testid="btn-2">버튼 2</Popover.Close>
            <Popover.Close data-testid="btn-3">버튼 3</Popover.Close>
          </Popover.Content>
        </Popover>,
      );

      fireEvent.click(getByTestId("trigger"));

      // 마지막 버튼에서 Tab을 누르면 첫 번째 버튼으로 포커스가 이동한다.
      getByTestId("btn-3").focus();
      fireEvent.keyDown(getByTestId("btn-3"), { key: "Tab" });
      expect(document.activeElement).toBe(getByTestId("btn-1"));

      // 첫 번째 버튼에서 Shift+Tab을 누르면 마지막 버튼으로 포커스가 이동한다.
      getByTestId("btn-1").focus();
      fireEvent.keyDown(getByTestId("btn-1"), { key: "Tab", shiftKey: true });
      expect(document.activeElement).toBe(getByTestId("btn-3"));
    });
  });

  describe("Focus", () => {
    describe("Initial Focus", () => {
      it("focuses the first focusable element when popover opens", async () => {
        const { getByTestId } = render(<TestComponent />);

        fireEvent.click(getByTestId("popover-trigger"));

        // Popover.Content 내의 첫 번째 focusable 요소에 포커스가 가야 한다. (Popover.Close)
        expect(document.activeElement).toBe(getByTestId("popover-button"));
      });

      it("focuses Popover.Content itself when there are no focusable elements", async () => {
        const { getByTestId } = render(
          <Popover>
            <Popover.Trigger data-testid="trigger">트리거</Popover.Trigger>
            <Popover.Content data-testid="content">
              <Popover.Title>제목</Popover.Title>
            </Popover.Content>
          </Popover>,
        );

        fireEvent.click(getByTestId("trigger"));

        // Popover.Content에 포커스가 가야 한다.
        expect(document.activeElement).toBe(getByTestId("content"));

        // 이 상태에서 Tab 키를 눌러도 포커스가 Popover.Content에 머물러야 한다.
        fireEvent.keyDown(getByTestId("content"), { key: "Tab" });
        expect(document.activeElement).toBe(getByTestId("content"));

        // Shift+Tab 키를 눌러도 포커스가 Popover.Content에 머물러야 한다.
        fireEvent.keyDown(getByTestId("content"), {
          key: "Tab",
          shiftKey: true,
        });
        expect(document.activeElement).toBe(getByTestId("content"));
      });
    });

    describe("Return Focus", () => {
      it("returns focus to Popover.Trigger when closed", async () => {
        const { getByTestId } = render(<TestComponent />);

        const trigger = getByTestId("popover-trigger");
        fireEvent.click(trigger);
        expect(getByTestId("popover-content")).toBeTruthy();

        // Escape로 닫았을 때, Popover.Trigger로 포커스가 돌아와야 한다.
        fireEvent.keyDown(getByTestId("popover-content"), { key: "Escape" });
        expect(document.activeElement).toBe(trigger);

        fireEvent.click(trigger);
        expect(getByTestId("popover-content")).toBeTruthy();

        // Popover.Close로 닫았을 때, Popover.Trigger로 포커스가 돌아와야 한다.
        fireEvent.click(getByTestId("popover-button"));
        await waitFor(() => expect(document.activeElement).toBe(trigger));

        fireEvent.click(trigger);
        expect(getByTestId("popover-content")).toBeTruthy();

        // 외부 클릭으로 닫았을 때, Popover.Trigger로 포커스가 돌아와야 한다.
        fireEvent.mouseDown(getByTestId("outside-element"));
        await waitFor(() => expect(document.activeElement).toBe(trigger));
      });
    });
  });
});
