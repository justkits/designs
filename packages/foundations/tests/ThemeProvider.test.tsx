import { fireEvent, render, waitFor } from "@testing-library/react";

import { ThemeProvider, useTheme } from "@/theme";
import { setMode } from "@/theme/manager";

const TestComponent = () => {
  const { mode, setThemeMode } = useTheme();

  return (
    <div>
      Current Theme Mode: {mode}
      <button onClick={() => setThemeMode("light")}>Set Light Mode</button>
      <button onClick={() => setThemeMode("dark")}>Set Dark Mode</button>
      <button onClick={() => setThemeMode("system")}>Set System Mode</button>
    </div>
  );
};

function mockLocalStorage(storedMode: string | null) {
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem: () => storedMode,
      setItem: () => {},
    },
    writable: true,
  });
}

function mockMatchMedia(options: { prefersDark?: boolean } = {}) {
  let changeListener: ((e: MediaQueryListEvent) => void) | null = null;

  Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: options.prefersDark && query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (
        _event: string,
        listener: (e: MediaQueryListEvent) => void,
      ) => {
        changeListener = listener;
      },
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  return {
    simulateChange: (prefersDark: boolean) => {
      changeListener?.({ matches: prefersDark } as MediaQueryListEvent);
    },
  };
}

describe("ThemeProvider", () => {
  afterEach(() => {
    setMode("system");
  });

  it("should render children correctly (default)", () => {
    mockMatchMedia();

    const { container, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.theme).toBe("light");
  });

  it("should handle local storage correctly", async () => {
    setMode("dark");
    mockMatchMedia();

    const { container, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme Mode: dark")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.theme).toBe("dark");

    fireEvent.click(getByText("Set Light Mode"));

    waitFor(() => {
      expect(getByText("Current Theme Mode: light")).toBeTruthy();
      expect(container.ownerDocument.documentElement.dataset.theme).toBe(
        "light",
      );
    });
  });

  it("should handle system-preference correctly", async () => {
    mockLocalStorage("system");
    const { simulateChange } = mockMatchMedia({ prefersDark: true });

    const { container, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme Mode: system")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.theme).toBe("dark");

    simulateChange(false);

    await waitFor(() => {
      expect(container.ownerDocument.documentElement.dataset.theme).toBe(
        "light",
      );
    });

    // Simulate changing back to dark mode
    simulateChange(true);

    await waitFor(() => {
      expect(container.ownerDocument.documentElement.dataset.theme).toBe(
        "dark",
      );
    });
  });

  it("should do nothing when mode is not system, and system-preference changes", async () => {
    setMode("light");
    const { simulateChange } = mockMatchMedia({ prefersDark: true });

    const { container, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByText("Current Theme Mode: light")).toBeTruthy();
    expect(container.ownerDocument.documentElement.dataset.theme).toBe("light");

    simulateChange(false);

    await waitFor(() => {
      expect(container.ownerDocument.documentElement.dataset.theme).toBe(
        "light",
      );
    });
  });
});

describe("useTheme hook outside ThemeProvider", () => {
  it("should throw an error when used outside ThemeProvider", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );

    consoleErrorSpy.mockRestore();
  });
});
