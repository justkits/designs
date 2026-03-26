import { act, fireEvent, render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Alert - aria", () => {
  describe("ID", () => {
    it("Alert.Content's ID matches Alert.Trigger's aria-controls", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      const trigger = getByTestId("alert-trigger");
      fireEvent.click(trigger);

      const content = getByTestId("alert-content");
      expect(trigger.getAttribute("aria-controls")).toBe(content.id);
    });

    it("Alert.Title's ID matches Alert.Content's aria-labelledby", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      const content = getByTestId("alert-content");
      const title = getByTestId("alert-title");
      expect(content.getAttribute("aria-labelledby")).toBe(title.id);
    });

    it("Alert.Description's ID matches Alert.Content's aria-describedby", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      const content = getByTestId("alert-content");
      const description = getByTestId("alert-description");
      expect(content.getAttribute("aria-describedby")).toBe(description.id);
    });
  });

  describe("Attributes", () => {
    it("Alert.Trigger has aria-haspopup=dialog", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      expect(getByTestId("alert-trigger").getAttribute("aria-haspopup")).toBe(
        "dialog",
      );
    });

    it("Alert.Content has role=alertdialog and aria-modal=true", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      const content = getByTestId("alert-content");

      expect(content.getAttribute("role")).toBe("alertdialog");
      expect(content.getAttribute("aria-modal")).toBe("true");
    });

    it("should apply `inert` to outside DOM tree when Alert is open and should remove it when Alert is closed", async () => {
      const { getByTestId } = render(<TestComponent />);

      fireEvent.click(getByTestId("alert-trigger"));

      const outsideElement = getByTestId("outside-element");
      expect(outsideElement.hasAttribute("inert")).toBe(true);

      await act(async () => {
        fireEvent.click(getByTestId("alert-button"));
      });

      expect(outsideElement.hasAttribute("inert")).toBe(false);
    });
  });
});
