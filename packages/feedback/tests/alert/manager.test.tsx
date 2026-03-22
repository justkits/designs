import { act, render } from "@testing-library/react";

import { showAlert } from "@/alert/manager";
import { TestComponent } from "./_setup";

describe("Alert - manager", () => {
  it("should warn if showAlert is called without Alerter mounted", () => {
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    act(() => {
      showAlert("No Alerter", "This should warn in console");
    });

    expect(consoleWarnMock).toHaveBeenCalledWith(
      expect.stringContaining(
        "[Alert] called without an <Alerter> mounted in the tree. " +
          "Add <Alerter /> to your app root so alerts are displayed.",
      ),
    );

    consoleWarnMock.mockRestore();
  });

  it("should warn if showAlert is called while another alert is active", () => {
    const { getByText } = render(<TestComponent />);
    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    act(() => {
      showAlert("First Alert", "This is the first alert");
      showAlert("Second Alert", "This should warn in console");
    });

    expect(getByText("First Alert")).toBeTruthy();
    expect(getByText("This is the first alert")).toBeTruthy();

    expect(consoleWarnMock).toHaveBeenCalledWith(
      expect.stringContaining(
        "[Alert] called while another alert is in progress. Ignoring this call — in production, this is silently dropped with no warning.",
      ),
    );

    consoleWarnMock.mockRestore();
  });

  it("corner case: should not warn if production environment even if multiple alerts are triggered", () => {
    vi.stubEnv("NODE_ENV", "production");

    const { getByText } = render(<TestComponent />);

    const consoleWarnMock = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    act(() => {
      showAlert("First Alert", "This is the first alert");
      showAlert("Second Alert", "This should warn in console");
    });

    expect(getByText("First Alert")).toBeTruthy();
    expect(getByText("This is the first alert")).toBeTruthy();

    expect(consoleWarnMock).not.toHaveBeenCalled();

    consoleWarnMock.mockRestore();
    vi.unstubAllEnvs();
  });
});
