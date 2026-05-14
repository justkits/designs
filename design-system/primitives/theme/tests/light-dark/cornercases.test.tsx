import { render } from "@testing-library/react";

import { ThemeScript } from "@/light-dark/Script";
import { loadUserPreference, saveUserPreference } from "@/light-dark/storage";
import { TestComponent } from "../_setup";

describe("light-dark - corner cases", () => {
  it("server - should handle ThemeScript correctly (default)", () => {
    const { container } = render(<ThemeScript />);
    expect(container).toBeTruthy();
  });

  it("should handle local storage access errors gracefully", () => {
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = () => {
      throw new Error("Local storage access error");
    };
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = loadUserPreference("light", true);
    expect(result).toBe("light");
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "[JustKits Theme] Failed to load user preference:",
      ),
    );

    Storage.prototype.getItem = originalGetItem;
  });

  it("should handle local storage save errors gracefully", () => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error("Local storage access error");
    };
    vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(() => saveUserPreference("dark")).not.toThrow();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "[JustKits Theme] Failed to save user preference:",
      ),
    );

    Storage.prototype.setItem = originalSetItem;
  });

  it("useTheme should throw an error when used outside ThemeProvider", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );

    consoleErrorSpy.mockRestore();
  });
});
