import { act, fireEvent, render } from "@testing-library/react";

import { toast } from "@/toast/api";
import { getSnapshot } from "@/toast/state";
import { TestComponent } from "./_setup";

describe("toast - renders", () => {
  afterEach(() => {
    act(() => {
      getSnapshot().forEach((t) => t.dismiss());
    });
  });

  it("should render all types of toasts", () => {
    const { getByText } = render(<TestComponent />);

    act(() => {
      toast("Default Toast");
      toast.info("Info Toast");
      toast.success("Success Toast");
      toast.warning("Warning Toast");
      toast.error("Error Toast");
    });

    expect(getByText("Default Toast")).toBeTruthy();
    expect(getByText("Info Toast")).toBeTruthy();
    expect(getByText("Success Toast")).toBeTruthy();
    expect(getByText("Warning Toast")).toBeTruthy();
    expect(getByText("Error Toast")).toBeTruthy();
  });

  it("should remove toast from queue on dismiss", () => {
    const { getByText, queryByText } = render(<TestComponent />);

    act(() => {
      toast.info("Dismissable Toast", { duration: 5000 });
    });

    const toastElement = getByText("Dismissable Toast");
    expect(toastElement).toBeTruthy();

    act(() => {
      const dismissButton = getByText("Dismiss");
      fireEvent.click(dismissButton);
    });

    expect(queryByText("Dismissable Toast")).toBeNull();
  });

  it("should warn if maxToasts is set to 0 or less", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<TestComponent maxToasts={0} />);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Toast] maxToasts 옵션은 0보다 큰 값을 권장드립니다. 0 이하로 설정하시면 토스트가 보이지 않습니다.",
    );

    render(<TestComponent maxToasts={-1} />);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[Toast] maxToasts 옵션은 0보다 큰 값을 권장드립니다. 0 이하로 설정하시면 토스트가 보이지 않습니다.",
    );

    consoleWarnSpy.mockRestore();
  });

  it("should not warn in production environment", () => {
    vi.stubEnv("NODE_ENV", "production");

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<TestComponent maxToasts={0} />);
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    render(<TestComponent maxToasts={-1} />);
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
    vi.unstubAllEnvs();
  });
});
