import { act, fireEvent, render } from "@testing-library/react";

import { setupConsoleSpy, setupTimer } from "../_setup";
import { swipe, TestComponent } from "./_setup";

function simulateTab() {
  const tabbable = Array.from(
    document.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
    ),
  );
  const index = tabbable.indexOf(document.activeElement as HTMLElement);
  tabbable.at(index + 1)?.focus();
}

describe("Toast - interactions", () => {
  setupConsoleSpy("development");
  setupTimer();

  describe("Clicks", () => {
    it("trigger click opens the toast and close click closes the toast", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // 초기에는 Toast.Content가 렌더링되지 않아야 한다.
      expect(queryByTestId("toast-content")).toBeNull();

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      act(() => fireEvent.click(getByTestId("toast-close")));
      expect(queryByTestId("toast-content")).toBeNull();
    });
  });

  describe("Auto Dismiss", () => {
    it("automatically closes after the specified duration", () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent duration={3000} />,
      );

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      act(() => vi.advanceTimersByTime(3000));

      expect(queryByTestId("toast-content")).toBeNull();
    });

    it("pauses the auto-dismiss timer on mouse enter and resumes on mouse leave", () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent duration={3000} />,
      );

      act(() => fireEvent.click(getByTestId("toast-trigger")));

      expect(getByTestId("toast-content")).toBeTruthy();

      // 마우스 엔터로 타이머 일시정지
      act(() => {
        fireEvent.mouseEnter(getByTestId("toast-content"));
        vi.advanceTimersByTime(3000);
      });

      // 타이머가 일시정지되어 있어야 한다.
      expect(getByTestId("toast-content")).toBeTruthy();

      // 마우스 리브로 타이머 재개
      act(() => {
        fireEvent.mouseLeave(getByTestId("toast-content"));
        vi.advanceTimersByTime(3000);
      });

      // 타이머가 재개되어 토스트가 닫혀야 한다.
      expect(queryByTestId("toast-content")).toBeNull();
    });

    it("does not resume the timer even if mouse leaves, if the keyboard focus is still inside Toast.Content`", () => {
      const { getByTestId } = render(<TestComponent duration={3000} />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));

      expect(getByTestId("toast-content")).toBeTruthy();

      // 마우스 엔터로 타이머 일시정지
      act(() => {
        fireEvent.mouseEnter(getByTestId("toast-content"));
        vi.advanceTimersByTime(3000);
      });

      // 타이머가 일시정지되어 있어야 한다.
      expect(getByTestId("toast-content")).toBeTruthy();

      // 버튼에 포커스
      act(() => getByTestId("toast-close").focus());

      // 마우스 리브로 타이머 재개 시도
      act(() => {
        fireEvent.mouseLeave(getByTestId("toast-content"));
        vi.advanceTimersByTime(3000);
      });

      // 키보드 포커스가 여전히 Toast.Content 내부에 있으므로, 타이머가 재개되지 않아야 한다.
      expect(getByTestId("toast-content")).toBeTruthy();
    });
  });

  describe("Keyboard", () => {
    it("closes the toast when Escape is pressed while focus is inside Toast.Content", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 포커스가 없을 때 Escape 키를 누르면 토스트가 닫히면 안 된다.
      act(() => fireEvent.keyDown(document.body, { key: "Escape" }));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 포커스가 Toast.Content 내부에 있다고 하더라도, 다른 키를 누르면 토스트가 닫히면 안 된다.
      act(() => getByTestId("toast-close").focus());
      act(() => fireEvent.keyDown(document.body, { key: "Enter" }));
      expect(getByTestId("toast-content")).toBeTruthy();

      // Escape 키를 누르면 토스트가 닫혀야 한다.
      act(() => getByTestId("toast-close").focus());
      act(() => fireEvent.keyDown(document.body, { key: "Escape" }));
      expect(queryByTestId("toast-content")).toBeNull();
    });
  });

  describe("Focus", () => {
    it("does not trap the focus inside Toast.Content", () => {
      const { getByTestId } = render(<TestComponent />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 포커스를 Toast.Content 내부의 버튼으로 이동시키고 Tab 키를 누르면 포커스가 외부 요소로 이동해야 한다.
      const closeButton = getByTestId("toast-close");
      act(() => closeButton.focus());
      act(() => simulateTab());
      expect(document.activeElement).toBe(getByTestId("outside-button"));
    });

    it("does not automatically focus any element when the toast opens", () => {
      const { getByTestId } = render(<TestComponent />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 토스트가 열릴 때 자동으로 포커스가 이동하면 안 된다.
      expect(document.activeElement).toBe(document.body);
    });

    it("pauses the auto-dismiss timer while focus is inside Toast.Content and resumes when it leaves", () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent duration={3000} />,
      );

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 버튼에 포커스
      act(() => getByTestId("toast-close").focus());

      // 타이머가 일시정지되어 있어야 한다.
      act(() => vi.advanceTimersByTime(3000));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 포커스 이동
      act(() => simulateTab());

      // 타이머가 재개되어 토스트가 닫혀야 한다.
      act(() => vi.advanceTimersByTime(3000));
      expect(queryByTestId("toast-content")).toBeNull();
    });

    it("does not resume the timer even if focus leaves, if the mouse is still inside Toast.Content`", () => {
      const { getByTestId } = render(<TestComponent duration={3000} />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 버튼에 포커스
      act(() => getByTestId("toast-close").focus());

      // 타이머가 일시정지되어 있어야 한다.
      act(() => vi.advanceTimersByTime(3000));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 마우스 엔터로 타이머 일시정지
      act(() => fireEvent.mouseEnter(getByTestId("toast-content")));

      // 포커스 이동 시도
      act(() => simulateTab());

      // 마우스가 여전히 Toast.Content 내부에 있으므로, 타이머가 재개되지 않아야 한다.
      act(() => vi.advanceTimersByTime(3000));
      expect(getByTestId("toast-content")).toBeTruthy();
    });
  });

  describe("Touch", () => {
    it("swiping the toast in a specified direction over the threshold should close the toast", () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent swipeDirection={["left"]} swipeThreshold={50} />,
      );

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      const toast = getByTestId("toast-content");
      expect(toast).toBeTruthy();

      // Threshold보다 작은 스와이프는 토스트를 닫지 않아야 한다.
      act(() => swipe(toast, "left", 30));
      expect(toast).toBeTruthy();

      // 방향이 달라도 토스트를 닫지 않아야 한다.
      act(() => swipe(toast, "right", 60));
      expect(toast).toBeTruthy();

      // 토스트를 왼쪽으로 60px 스와이프하면 토스트가 닫혀야 한다.
      act(() => swipe(toast, "left", 60));

      // 스와이프 방향이 허용되고 임계값을 초과했으므로 토스트가 닫혀야 한다.
      expect(queryByTestId("toast-content")).toBeNull();
    });
  });
});
