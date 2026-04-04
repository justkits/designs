import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TestComponent } from "./_setup";

describe("Select - interactions", () => {
  it("should toggle the menu when trigger is clicked", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    // 처음에는 menu가 보이지 않아야 한다.
    expect(queryByTestId("select-menu")).not.toBeTruthy();

    // trigger를 클릭하면 menu가 보여야 한다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(getByTestId("select-menu")).toBeTruthy();

    // trigger를 다시 클릭하면 menu가 숨겨져야 한다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(queryByTestId("select-menu")).not.toBeTruthy();
  });

  it("should close the menu on outside click when it is open", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    // trigger를 클릭하여 menu를 연다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(getByTestId("select-menu")).toBeTruthy();

    // menu 안쪽을 클릭하면 menu가 닫히지 않아야 한다.
    fireEvent.mouseDown(getByTestId("select-menu"));
    expect(getByTestId("select-menu")).toBeTruthy();

    // menu 외부를 클릭하면 menu가 닫혀야 한다.
    fireEvent.mouseDown(document);
    expect(queryByTestId("select-menu")).not.toBeTruthy();
  });

  it("should close the menu on Escape key press when it is open", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    // trigger를 클릭하여 menu를 연다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(getByTestId("select-menu")).toBeTruthy();

    // Escape 키를 누르면 menu가 닫혀야 한다.
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(queryByTestId("select-menu")).not.toBeTruthy();
  });

  it("should update the value and close the menu when an item is clicked", () => {
    const { getByTestId, queryByTestId, getByText } = render(<TestComponent />);

    // trigger를 클릭하여 menu를 연다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(getByTestId("select-menu")).toBeTruthy();

    // "그룹 아이템 2" 아이템을 클릭한다.
    fireEvent.click(getByText("그룹 아이템 2"));

    // value가 "그룹 아이템 2"로 업데이트되어야 한다.
    expect(getByTestId("select-value").textContent).toBe("그룹 아이템 2");
    // menu가 닫혀야 한다.
    expect(queryByTestId("select-menu")).not.toBeTruthy();

    // 다시 열어서 disabled된 아이템을 클릭해도, value는 업데이트 되지 않아야 하고, menu는 닫히지 않아야 한다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(getByTestId("select-menu")).toBeTruthy();

    fireEvent.click(getByText("옵션을 선택하세요."));
    expect(getByTestId("select-value").textContent).toBe("그룹 아이템 2");
    expect(getByTestId("select-menu")).toBeTruthy();
  });

  it("should navigate through items with keyboard and select an item with Enter key", async () => {
    const user = userEvent.setup();
    const { getByTestId, queryByTestId, getByText } = render(<TestComponent />);

    // trigger를 클릭하여 menu를 연다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(getByTestId("select-menu")).toBeTruthy();

    // ArrowDown 키를 눌러 첫 번째 아이템으로 이동한다.
    fireEvent.keyDown(getByTestId("select-menu"), {
      key: "ArrowDown",
      code: "ArrowDown",
    });
    expect(document.activeElement).toBe(
      getByText("그룹 아이템 1").parentElement,
    );

    // ArrowDown 키를 다시 눌러 다음 아이템으로 이동한다.
    fireEvent.keyDown(getByTestId("select-menu"), {
      key: "ArrowDown",
      code: "ArrowDown",
    });
    expect(document.activeElement).toBe(
      getByText("그룹 아이템 2").parentElement,
    );

    // Home 키를 눌러 첫 번째 아이템으로 이동한다.
    fireEvent.keyDown(getByTestId("select-menu"), {
      key: "Home",
      code: "Home",
    });
    expect(document.activeElement).toBe(
      getByText("일반 아이템 1").parentElement,
    );

    // End 키를 눌러 마지막 아이템으로 이동한다.
    fireEvent.keyDown(getByTestId("select-menu"), { key: "End", code: "End" });
    expect(document.activeElement).toBe(
      getByText("그룹 아이템 3").parentElement,
    );

    // ArrowUp 키를 눌러 이전 아이템으로 이동한다.
    fireEvent.keyDown(getByTestId("select-menu"), {
      key: "ArrowUp",
      code: "ArrowUp",
    });
    expect(document.activeElement).toBe(
      getByText("그룹 아이템 2").parentElement,
    );

    // Enter 키를 눌러 현재 하이라이트된 아이템을 선택한다.
    await user.keyboard("{Enter}");
    expect(getByTestId("select-value").textContent).toBe("그룹 아이템 2");
    expect(queryByTestId("select-menu")).not.toBeTruthy();
  });

  it("closes the menu and moves focus to next focusable element when Tab is pressed while menu is open", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    // trigger를 클릭하여 menu를 연다.
    fireEvent.click(getByTestId("select-trigger"));
    expect(getByTestId("select-menu")).toBeTruthy();

    // Tab 키를 누른다.
    fireEvent.keyDown(document, { key: "Tab", code: "Tab" });

    // menu가 닫혀야 한다.
    expect(queryByTestId("select-menu")).not.toBeTruthy();
    // focus가 trigger로 복귀한다.
    expect(document.activeElement).toBe(getByTestId("select-trigger"));
  });
});
