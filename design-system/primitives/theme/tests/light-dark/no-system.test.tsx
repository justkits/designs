import { fireEvent, render } from "@testing-library/react";

import { ThemeProvider } from "@/light-dark";
import { STORAGE_KEY } from "@/light-dark/storage";
import { TestComponent } from "../_setup";

describe("light-dark - no system", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("default properties", () => {
    const { container, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    // 시스템 모드가 없을 때는, 기본값이 light이다
    expect(getByText("Current Theme Mode: light")).toBeTruthy();
    expect(getByText("Resolved Theme: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "light",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "light",
    );
  });

  it("default mode = dark", () => {
    const { container, getByText } = render(
      <ThemeProvider defaultMode="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    // 시스템 모드가 없을 때, 개발자가 defaultMode로 dark를 설정하면, 초기값이 dark이다
    expect(getByText("Current Theme Mode: dark")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "dark",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "dark",
    );
  });

  it("handles user theme changes correctly", () => {
    const { container, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    // 기본값 먼저 확인
    expect(getByText("Current Theme Mode: light")).toBeTruthy();
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

    // light 모드를 선택하면 정상적으로 변경되어야 한다
    fireEvent.click(getByText("Set Light Mode"));
    expect(getByText("Current Theme Mode: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "light",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "light",
    );

    // 시스템 모드를 선택하면, 변경되지 않고, 경고 메시지가 출력되어야 한다
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    fireEvent.click(getByText("Set System Mode"));
    expect(getByText("Current Theme Mode: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "light",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "light",
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "System mode is not enabled. Please set withSystem to true to use system mode.",
    );

    consoleWarnSpy.mockRestore();
  });

  it("handles stored preference correctly", () => {
    // localStorage 값이 최우선순위다.
    localStorage.setItem(STORAGE_KEY, "dark");

    const { container, getByText } = render(
      <ThemeProvider defaultMode="light">
        <TestComponent />
      </ThemeProvider>,
    );

    // localStorage에 저장된 값이 적용된다
    expect(getByText("Current Theme Mode: dark")).toBeTruthy();
    expect(getByText("Resolved Theme: dark")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "dark",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "dark",
    );
  });

  it("handles invalid stored preference gracefully", () => {
    // withSystem이 false일 땐 system은 invalid한 값이다
    localStorage.setItem(STORAGE_KEY, "system");

    // invalid한 값이 저장되어 있으면, defaultMode로 fallback되어야 한다
    const { container, getByText } = render(
      <ThemeProvider defaultMode="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    // invalid한 값이 저장되어 있을 때, 시스템 모드가 없으면, defaultMode인 dark로 fallback되어야 한다
    expect(getByText("Current Theme Mode: dark")).toBeTruthy();
    expect(getByText("Resolved Theme: dark")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
      "dark",
    );
    expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
      "dark",
    );
  });
});
