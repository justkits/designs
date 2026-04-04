import { useState } from "react";

import { Select } from "@/Select";

export function TestComponent() {
  const [value, setValue] = useState<string>("");

  return (
    <Select
      value={value}
      onValueChange={setValue}
      placeholder="Select an option"
    >
      <Select.Label>라벨</Select.Label>
      <Select.Trigger data-testid="select-trigger">
        <Select.Value data-testid="select-value" />
        <span>Check Icon</span>
      </Select.Trigger>
      <Select.Menu data-testid="select-menu">
        <Select.Item disabled>
          <Select.ItemText>옵션을 선택하세요.</Select.ItemText>
        </Select.Item>
        <Select.Item value="일반">
          <Select.ItemText>일반 아이템 1</Select.ItemText>
        </Select.Item>
        <Select.ItemGroup>
          <Select.Item value="그룹 아이템 1">
            <Select.ItemText>그룹 아이템 1</Select.ItemText>
          </Select.Item>
          <Select.Item value="그룹 아이템 2">
            <Select.ItemText>그룹 아이템 2</Select.ItemText>
          </Select.Item>
          <Select.Item value="그룹 아이템 3">
            <Select.ItemText>그룹 아이템 3</Select.ItemText>
          </Select.Item>
        </Select.ItemGroup>
      </Select.Menu>
    </Select>
  );
}
