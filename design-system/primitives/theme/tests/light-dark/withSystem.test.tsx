import { act, fireEvent, render } from "@testing-library/react";

import { ThemeProvider } from "@/light-dark";
import { TestComponent, mockMatchMedia } from "../_setup";

describe("light-dark - with system", () => {
  const { simulateChange } = mockMatchMedia({ preferDark: false });

  it("default properties", () => {
    const { container, getByText } = render(
      <ThemeProvider withSystem>
        <TestComponent />
      </ThemeProvider>,
    );

    // 시스템 모드가 있을 때는, 기본값이 system이다
    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "light",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "light",
    );
  });

  it("handles user theme changes correctly", () => {
    const { container, getByText } = render(
      <ThemeProvider withSystem>
        <TestComponent />
      </ThemeProvider>,
    );

    // 기본값 먼저 확인
    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();

    // dark 모드를 선택하면 정상적으로 변경되어야 한다
    fireEvent.click(getByText("Set Dark Mode"));
    expect(getByText("Current Theme Mode: dark")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "dark",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "dark",
    );

    // system 모드를 선택하면, 시스템 설정에 따라 resolvedTheme이 변경되어야 한다
    fireEvent.click(getByText("Set System Mode"));
    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "light",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "light",
    );
  });

  it("handles system preference changes correctly", () => {
    const { container, getByText } = render(
      <ThemeProvider withSystem>
        <TestComponent />
      </ThemeProvider>,
    );

    // 시스템 모드가 있을 때는, 기본값이 system이다
    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "light",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "light",
    );

    // 시스템 설정이 변경되면, resolvedTheme이 변경되어야 한다 (dark로 변경)
    act(() => {
      simulateChange(true);
    });

    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(getByText("Resolved Theme: dark")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "dark",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "dark",
    );

    // 다시 light로 변경되는 경우도 테스트
    act(() => {
      simulateChange(false);
    });

    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "light",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "light",
    );
  });
});
