import { fireEvent, render, waitFor } from "@testing-library/react";

import { Popover } from "@/Popover";
import { TestComponent } from "./_setup";

describe("Popover - state", () => {
  it("supports uncontrolled mode", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    expect(queryByTestId("popover-content")).toBeNull();

    fireEvent.click(getByTestId("popover-trigger"));
    expect(getByTestId("popover-content")).toBeTruthy();
  });

  it("supports controlled mode with isOpen and onOpenChange", async () => {
    const onOpenChange = vi.fn();

    const { getByTestId, queryByTestId, rerender } = render(
      <Popover isOpen={false} onOpenChange={onOpenChange}>
        <Popover.Trigger data-testid="trigger">Trigger</Popover.Trigger>
        <Popover.Content data-testid="content">
          <Popover.Close data-testid="close-button">Close</Popover.Close>
        </Popover.Content>
      </Popover>,
    );

    expect(queryByTestId("content")).toBeNull();

    fireEvent.click(getByTestId("trigger"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Popover isOpen={true} onOpenChange={onOpenChange}>
        <Popover.Trigger data-testid="trigger">Trigger</Popover.Trigger>
        <Popover.Content data-testid="content">
          <Popover.Close data-testid="close-button">Close</Popover.Close>
        </Popover.Content>
      </Popover>,
    );
    onOpenChange.mockClear();

    expect(getByTestId("content")).toBeTruthy();

    fireEvent.click(getByTestId("close-button"));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
  });
});
