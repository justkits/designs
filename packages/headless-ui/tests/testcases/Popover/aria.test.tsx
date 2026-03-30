import { fireEvent, render } from "@testing-library/react";

import { AlwaysOpenTestComponent, TestComponent } from "./_setup";

describe("Popover - aria", () => {
  describe("ID", () => {
    it("Popover.Content's ID matches Popover.Trigger's aria-controls", () => {
      const { getByTestId } = render(<AlwaysOpenTestComponent />);

      const trigger = getByTestId("popover-trigger");
      const content = getByTestId("popover-content");
      expect(trigger.getAttribute("aria-controls")).toBe(content.id);
    });

    it("Popover.Title's ID matches Popover.Content's aria-labelledby", () => {
      const { getByTestId } = render(<AlwaysOpenTestComponent />);

      const content = getByTestId("popover-content");
      const title = getByTestId("popover-title");
      expect(content.getAttribute("aria-labelledby")).toBe(title.id);
    });

    it("Popover.Content's aria-label is 'Popover Content' if Popover.Title is not rendered", () => {
      const { getByTestId } = render(<TestComponent omit="title" />);

      // Trigger를 클릭하여 Popover를 연다
      fireEvent.click(getByTestId("popover-trigger"));

      const content = getByTestId("popover-content");
      expect(content.getAttribute("aria-labelledby")).toBeNull();
      expect(content.getAttribute("aria-label")).toBe("Popover Content");
    });
  });

  describe("Attributes", () => {
    it("Popover.Trigger has aria-haspopup=dialog", () => {
      const { getByTestId } = render(<AlwaysOpenTestComponent />);

      expect(getByTestId("popover-trigger").getAttribute("aria-haspopup")).toBe(
        "dialog",
      );
    });

    it("Popover.Trigger has aria-expanded=false when closed and aria-expanded=true when open", () => {
      const { getByTestId } = render(<TestComponent />);

      const trigger = getByTestId("popover-trigger");
      expect(trigger.getAttribute("aria-expanded")).toBe("false");

      fireEvent.click(trigger);

      expect(getByTestId("popover-trigger").getAttribute("aria-expanded")).toBe(
        "true",
      );
    });

    it("Popover.Content uses a <dialog> element (implicit role=dialog)", () => {
      const { getByTestId } = render(<AlwaysOpenTestComponent />);

      expect(getByTestId("popover-content").tagName).toBe("DIALOG");
      expect(
        getByTestId("popover-content").getAttribute("aria-modal"),
      ).toBeNull();
    });

    it("Popover.Arrow has aria-hidden=true", () => {
      const { getByTestId } = render(<AlwaysOpenTestComponent />);

      expect(getByTestId("popover-arrow").getAttribute("aria-hidden")).toBe(
        "true",
      );
    });
  });
});
