import { fireEvent, render } from "@testing-library/react";

import { Select } from "@/Select";

describe("Select - corner cases", () => {
  it("guards against disabled items being selected", () => {
    // asChild로 bypass한 다음, button이 아닌 요소로 disabled 상태를 무시하고 클릭하는 경우
    const { getByTestId, getByText } = render(
      <Select value="" onValueChange={() => {}}>
        <Select.Trigger data-testid="select-trigger">
          <Select.Value data-testid="select-value" />
        </Select.Trigger>
        <Select.Menu data-testid="select-menu">
          <Select.Item disabled asChild>
            <span>Disabled Item</span>
          </Select.Item>
        </Select.Menu>
      </Select>,
    );

    fireEvent.click(getByTestId("select-trigger"));
    fireEvent.click(getByText("Disabled Item"));

    // disabled된 아이템이 선택되지 않아야 하고, menu가 닫히지 않아야 한다.
    expect(getByTestId("select-value").textContent).toBe("");
    expect(getByTestId("select-menu")).toBeTruthy();
  });
});
