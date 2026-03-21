import { PopoverArrow } from "./PopoverArrow";
import { PopoverContent } from "./PopoverContent";
import { PopoverTrigger } from "./PopoverTrigger";
import { Wrapper } from "./Wrapper";

export const Popover = Object.assign(Wrapper, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
});
