import { fireEvent, render } from "@testing-library/react";

import { Alert } from "@/Alert";
import { setupConsoleSpy } from "../_setup";

describe("Alert - corner cases", () => {
  const { warnSpy: consoleWarnSpy } = setupConsoleSpy("production");

  describe("asChild onClick chaining", () => {
    it("fires both the child onClick and the slot onClick", () => {
      const childClickSpy = vi.fn();
      const onOpenChangeSpy = vi.fn();

      const { getByTestId } = render(
        <Alert isOpen={false} onOpenChange={onOpenChangeSpy}>
          <Alert.Trigger asChild>
            <button data-testid="trigger" onClick={childClickSpy}>
              Open
            </button>
          </Alert.Trigger>
        </Alert>,
      );

      fireEvent.click(getByTestId("trigger"));

      expect(childClickSpy).toHaveBeenCalledTimes(1);
      expect(onOpenChangeSpy).toHaveBeenCalledWith(true);
    });
  });

  it("does not log warnings for missing Alert.Content in production environment", () => {
    render(<Alert isOpen>Placeholder</Alert>);

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it("does not log warnings for missing Alert.Title or Alert.Button in production environment", () => {
    render(
      <Alert isOpen>
        <Alert.Content />
      </Alert>,
    );

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
