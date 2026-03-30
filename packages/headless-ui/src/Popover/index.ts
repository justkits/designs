import { PopoverArrow } from "./PopoverArrow";
import { PopoverClose } from "./PopoverClose";
import { PopoverContent } from "./PopoverContent";
import { PopoverTitle } from "./PopoverTitle";
import { PopoverTrigger } from "./PopoverTrigger";
import { Provider } from "./Provider";

export const Popover = Object.assign(Provider, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
  Title: PopoverTitle,
});
