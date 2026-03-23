import { act, render } from "@testing-library/react";

import { showAlert, showConfirm } from "@/alert/api";
import { dispatch } from "@/alert/state";
import { TestComponent } from "./_setup";

describe("alert - renders", () => {
  afterEach(() => {
    act(() => {
      dispatch(null);
    });
  });

  it("renders nothing initially", () => {
    const { container } = render(<TestComponent />);

    expect(container.firstChild).toBeNull();
  });

  it("renders AlertComponent when alert type is 'alert'", () => {
    const { getByText, queryByTestId } = render(<TestComponent />);

    act(() => {
      showAlert("Alert Title", "message");
    });

    expect(getByText("Alert Title")).toBeTruthy();
    expect(getByText("message")).toBeTruthy();
    expect(queryByTestId("confirm-component")).toBeNull();
  });

  it("renders ConfirmComponent when alert type is 'confirm'", () => {
    const { getByText, queryByTestId } = render(<TestComponent />);

    act(() => {
      showConfirm("Confirm Title", "message", vi.fn());
    });

    expect(getByText("Confirm Title")).toBeTruthy();
    expect(getByText("message")).toBeTruthy();
    expect(queryByTestId("alert-component")).toBeNull();
  });
  /*
   */
});
