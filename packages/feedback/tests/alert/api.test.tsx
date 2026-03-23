import { act, render } from "@testing-library/react";

import { showAlert, showConfirm } from "@/alert/api";
import { dispatch } from "@/alert/state";
import { TestComponent } from "./_setup";

describe("alert - api corner cases", () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    act(() => {
      dispatch(null);
    });
    consoleWarnSpy.mockRestore();
  });

  it("should warn if alert is called in a non-browser environment", () => {
    vi.stubGlobal("document", undefined);

    act(() => {
      showAlert("Non-browser Alert", "This should warn in console");
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Alert] Alert cannot be shown in a non-browser environment. Ignoring alert...",
    );
  });

  it("should not warn in production environment (non-browser)", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubGlobal("document", undefined);

    act(() => {
      showAlert("Non-browser Alert", "This should be silently dropped");
    });

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("should warn if showAlert is called while another alert is active", () => {
    const { getByText } = render(<TestComponent />);

    act(() => {
      showAlert("First Alert", "This is the first alert");
      showAlert("Second Alert", "This should warn in console");
    });

    expect(getByText("First Alert")).toBeTruthy();
    expect(getByText("This is the first alert")).toBeTruthy();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[Alert] called while another alert is in progress. Ignoring this call — in production, this is silently dropped with no warning.",
      ),
    );
  });

  it("should warn if showConfirm is called while another alert is active", () => {
    const { getByText } = render(<TestComponent />);

    act(() => {
      showAlert("First Alert", "This is the first alert");
      showConfirm("Second Confirm", "This should warn in console", vi.fn());
    });

    expect(getByText("First Alert")).toBeTruthy();
    expect(getByText("This is the first alert")).toBeTruthy();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[Alert] called while another alert is in progress. Ignoring this call — in production, this is silently dropped with no warning.",
      ),
    );
  });

  it("should warn if showAlert is called while another confirm is active", () => {
    const { getByText } = render(<TestComponent />);

    act(() => {
      showConfirm("First Confirm", "This is the first confirm", vi.fn());
      showAlert("Second Alert", "This should warn in console");
    });

    expect(getByText("First Confirm")).toBeTruthy();
    expect(getByText("This is the first confirm")).toBeTruthy();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[Alert] called while another alert is in progress. Ignoring this call — in production, this is silently dropped with no warning.",
      ),
    );
  });

  it("should not warn in production environment even if multiple alerts are triggered", () => {
    vi.stubEnv("NODE_ENV", "production");

    const { getByText } = render(<TestComponent />);

    act(() => {
      showAlert("First Alert", "This is the first alert");
      showAlert("Second Alert", "This should be silently dropped");
    });

    expect(getByText("First Alert")).toBeTruthy();
    expect(getByText("This is the first alert")).toBeTruthy();

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
