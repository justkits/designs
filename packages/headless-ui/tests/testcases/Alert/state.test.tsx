import { act, fireEvent, render } from "@testing-library/react";

import { Alert } from "@/Alert";
import { TestComponent } from "./_setup";

describe("Alert - state", () => {
  it("supports uncontrolled mode", () => {
    // Alert.Trigger와 Alert.Button이 내부적으로 열기/닫기를 처리한다.
    const { getByTestId, queryByTestId } = render(<TestComponent />);
    expect(queryByTestId("alert-content")).toBeNull();
    fireEvent.click(getByTestId("alert-trigger"));
    expect(getByTestId("alert-content")).toBeTruthy();
  });

  it("supports controlled mode with isOpen and onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const { getByTestId, queryByTestId, rerender } = render(
      <Alert isOpen={false} onOpenChange={onOpenChange}>
        <Alert.Content data-testid="content">
          <Alert.Title>Title</Alert.Title>
          <Alert.Button data-testid="btn">OK</Alert.Button>
        </Alert.Content>
      </Alert>,
    );

    expect(queryByTestId("content")).toBeNull();

    rerender(
      <Alert isOpen={true} onOpenChange={onOpenChange}>
        <Alert.Content data-testid="content">
          <Alert.Title>Title</Alert.Title>
          <Alert.Button data-testid="btn">OK</Alert.Button>
        </Alert.Content>
      </Alert>,
    );

    expect(getByTestId("content")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId("btn"));
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
