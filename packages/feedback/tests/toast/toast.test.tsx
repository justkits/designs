import { toast } from "@/toast/api";

describe("toast - api corner cases", () => {
  it("should warn if duration is an invalid number", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toast.info("Invalid Duration Toast", { duration: 0 });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Toast] duration must be greater than 0. Ignoring toast...",
    );

    toast.info("Invalid Duration Toast", { duration: -100 });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Toast] duration must be greater than 0. Ignoring toast...",
    );

    consoleWarnSpy.mockRestore();
  });

  it("should not warn in production environment (invalid duration)", () => {
    vi.stubEnv("NODE_ENV", "production");

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toast.info("Invalid Duration Toast", { duration: 0 });

    expect(consoleWarnSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
    vi.unstubAllEnvs();
  });

  it("should not register toast in non-browser environment", () => {
    vi.stubGlobal("document", undefined);

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toast.info("Non-browser Toast");

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Toast] Toast cannot be shown in a non-browser environment. Ignoring toast...",
    );

    consoleWarnSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it("should not log warning in production environment (non-browser)", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubGlobal("document", undefined);

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toast.info("Non-browser Toast");

    expect(consoleWarnSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });
});
