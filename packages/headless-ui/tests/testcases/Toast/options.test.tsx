import { act, fireEvent, render } from "@testing-library/react";

import { setupTimer } from "../_setup";
import { swipe, TestComponent } from "./_setup";

describe("Toast - options", () => {
  setupTimer();

  describe("Duration", () => {
    it("should apply the correct default duration (5000ms)", () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 3000ms만 지나면 토스트는 아직 열려있어야 한다.
      act(() => vi.advanceTimersByTime(3000));
      expect(getByTestId("toast-content")).toBeTruthy();

      // 2000ms가 더 지나면 토스트가 닫혀야 한다.
      act(() => vi.advanceTimersByTime(2000));
      expect(queryByTestId("toast-content")).toBeNull();
    });

    it("does not close the toast automatically if duration is set to 'infinite'", () => {
      const { getByTestId } = render(<TestComponent duration="infinite" />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      act(() => vi.advanceTimersByTime(10000));
      expect(getByTestId("toast-content")).toBeTruthy();
    });
  });

  describe("Swipe", () => {
    it("should apply the correct default swipeDirection prop", () => {
      // 기본값은 ["left", "right", "up"]와 50이다.
      const { getByTestId, queryByTestId } = render(
        <TestComponent swipeThreshold={1} />,
      );

      // 먼저, 토스트를 열어야 한다.
      act(() => fireEvent.click(getByTestId("toast-trigger")));
      const toast = getByTestId("toast-content");
      expect(toast).toBeTruthy();

      // swipe를 왼쪽/오른쪽/위쪽 중 하나로 하면 토스트가 닫혀야 한다.
      act(() => swipe(toast, "left", 100));
      expect(queryByTestId("toast-content")).toBeNull();
    });

    it("should apply the correct default swipeThreshold prop", () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent swipeDirection={["up"]} />,
      );

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // swipe를 충분히 하지 않으면 토스트가 닫히면 안 된다.
      act(() => swipe(getByTestId("toast-content"), "up", 30));
      expect(getByTestId("toast-content")).toBeTruthy();

      // swipe를 충분히 하면 토스트가 닫혀야 한다.
      act(() => swipe(getByTestId("toast-content"), "up", 60));
      expect(queryByTestId("toast-content")).toBeNull();
    });
  });
});
