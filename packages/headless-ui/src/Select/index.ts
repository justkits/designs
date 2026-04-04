import { SelectItemGroup, SelectItem, SelectItemText } from "./SelectItem";
import { SelectLabel } from "./SelectLabel";
import { SelectMenu } from "./SelectMenu";
import { SelectTrigger, SelectValue } from "./SelectTrigger";
import { Provider } from "./Provider";

export type { SelectProps } from "./Provider";

export const Select = Object.assign(Provider, {
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Menu: SelectMenu,
  ItemGroup: SelectItemGroup,
  Item: SelectItem,
  ItemText: SelectItemText,
});
