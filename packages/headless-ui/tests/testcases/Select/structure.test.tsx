import { fireEvent, render } from "@testing-library/react";

import { Select } from "@/Select";
import { setupConsoleSpy } from "../_setup";

describe("Select - structure", () => {
  const { warnSpy } = setupConsoleSpy("development");

  describe("Select.Label", () => {
    it("must be used within the Select wrapper", () => {
      expect(() => render(<Select.Label>Label</Select.Label>)).toThrow(
        "Select components must be used within the Select wrapper",
      );
    });

    it("should render outside of Select.Trigger", () => {
      // 그렇지 않으면 콘솔에 경고가 출력된다.
      render(
        <Select value="" onValueChange={() => {}}>
          <Select.Trigger>
            <Select.Label>Label</Select.Label>
            <Select.Value data-testid="select-value" />
            <span>Check Icon</span>
          </Select.Trigger>
        </Select>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Select.Label should not be used inside Select.Trigger. Please move it outside of the trigger component.",
      );
    });

    it("should render outside of Select.Menu", () => {
      // 그렇지 않으면 콘솔에 경고가 출력된다.
      const { getByTestId } = render(
        <Select value="" onValueChange={() => {}}>
          <Select.Trigger data-testid="select-trigger">
            <Select.Value />
            <span>Check Icon</span>
          </Select.Trigger>
          <Select.Menu>
            <Select.Label>Label</Select.Label>
          </Select.Menu>
        </Select>,
      );

      // Menu가 렌더링 되도록 Trigger를 클릭한다.
      fireEvent.click(getByTestId("select-trigger"));

      expect(warnSpy).toHaveBeenCalledWith(
        "Select.Label should not be used inside Select.Menu. Please move it outside of the menu component.",
      );
    });

    it("supports asChild property", () => {
      const { getByText } = render(
        <Select value="" onValueChange={() => {}}>
          <Select.Trigger>
            <Select.Label asChild>
              <div>Custom Label</div>
            </Select.Label>
            <Select.Value />
            <span>Check Icon</span>
          </Select.Trigger>
        </Select>,
      );

      expect(getByText("Custom Label")).toBeTruthy();
    });
  });

  describe("Select.Trigger", () => {
    it("must be used within the Select wrapper", () => {
      expect(() => render(<Select.Trigger>Trigger</Select.Trigger>)).toThrow(
        "Select components must be used within the Select wrapper",
      );
    });

    it("should render outside of Select.Menu", () => {
      // 그렇지 않으면 콘솔에 경고가 출력된다.
      const { getByTestId } = render(
        <Select value="" onValueChange={() => {}}>
          <Select.Trigger data-testid="select-trigger">
            <Select.Value />
            <span>Check Icon</span>
          </Select.Trigger>
          <Select.Menu>
            <Select.Trigger>Trigger</Select.Trigger>
          </Select.Menu>
        </Select>,
      );

      // Menu가 렌더링 되도록 Trigger를 클릭한다.
      fireEvent.click(getByTestId("select-trigger"));

      expect(warnSpy).toHaveBeenCalledWith(
        "Select.Trigger should not be used inside Select.Menu. Please move it outside of the menu component.",
      );
    });

    it("supports asChild property", () => {
      const { getByText } = render(
        <Select value="Option 1" onValueChange={() => {}}>
          <Select.Trigger asChild>
            <div>Custom Trigger</div>
          </Select.Trigger>
        </Select>,
      );

      expect(getByText("Custom Trigger")).toBeTruthy();
    });
  });

  describe("Select.Value", () => {
    it("must be used within the Select wrapper", () => {
      expect(() => render(<Select.Value />)).toThrow(
        "Select components must be used within the Select wrapper",
      );
    });

    it("must be used within Select.Trigger", () => {
      expect(() =>
        render(
          <Select value="" onValueChange={() => {}}>
            <Select.Value />
          </Select>,
        ),
      ).toThrow("Select.Value must be used within Select.Trigger");
    });

    it("supports asChild property", () => {
      const { getByText } = render(
        <Select
          value="Option 1"
          onValueChange={() => {}}
          placeholder="Select an option"
        >
          <Select.Trigger>
            <Select.Value asChild>
              <div>Custom Value</div>
            </Select.Value>
          </Select.Trigger>
        </Select>,
      );

      expect(getByText("Custom Value")).toBeTruthy();
    });
  });

  describe("Select.Menu", () => {
    it("must be used within the Select wrapper", () => {
      expect(() => render(<Select.Menu>Menu</Select.Menu>)).toThrow(
        "Select components must be used within the Select wrapper",
      );
    });

    it("supports asChild property", () => {
      const { getByText } = render(
        <Select value="" onValueChange={() => {}}>
          <Select.Trigger>
            <Select.Value />
            <span>Check Icon</span>
          </Select.Trigger>
          <Select.Menu asChild>
            <div>Custom Menu</div>
          </Select.Menu>
        </Select>,
      );

      // Trigger를 클릭하여 Menu가 렌더링 되도록 한다.
      fireEvent.click(getByText("Check Icon"));

      expect(getByText("Custom Menu")).toBeTruthy();
    });
  });

  describe("Select.ItemGroup", () => {
    it("must be used within Select.Menu", () => {
      expect(() =>
        render(<Select.ItemGroup>Item Group</Select.ItemGroup>),
      ).toThrow("Select.ItemGroup must be used within a Select.Menu");
    });
  });

  describe("Select.Item", () => {
    it("must be used within Select.Menu", () => {
      expect(() =>
        render(
          <Select value="" onValueChange={() => {}}>
            <Select.Item value="option1">Item</Select.Item>
          </Select>,
        ),
      ).toThrow("Select.Item must be used within a Select.Menu");
    });

    it("supports asChild property", () => {
      const { getByText } = render(
        <Select value="" onValueChange={() => {}}>
          <Select.Trigger>
            <Select.Value />
            <span>Check Icon</span>
          </Select.Trigger>
          <Select.Menu>
            <Select.Item value="option1" asChild>
              <div>Custom Item</div>
            </Select.Item>
          </Select.Menu>
        </Select>,
      );

      // Trigger를 클릭하여 Menu가 렌더링 되도록 한다.
      fireEvent.click(getByText("Check Icon"));

      expect(getByText("Custom Item")).toBeTruthy();
    });
  });

  describe("Select.ItemText", () => {
    it("must be used within Select.Item", () => {
      expect(() =>
        render(<Select.ItemText>Item Text</Select.ItemText>),
      ).toThrow("Select.ItemText must be used within a Select.Item");
    });

    it("supports asChild property", () => {
      const { getByText } = render(
        <Select value="" onValueChange={() => {}}>
          <Select.Trigger>
            <Select.Value />
            <span>Check Icon</span>
          </Select.Trigger>
          <Select.Menu>
            <Select.Item value="option1">
              <Select.ItemText asChild>
                <div>Custom Item Text</div>
              </Select.ItemText>
            </Select.Item>
          </Select.Menu>
        </Select>,
      );

      // Trigger를 클릭하여 Menu가 렌더링 되도록 한다.
      fireEvent.click(getByText("Check Icon"));

      expect(getByText("Custom Item Text")).toBeTruthy();
    });
  });
});
