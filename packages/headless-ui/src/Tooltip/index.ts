import { Provider } from "./Provider";
import { TooltipArrow } from "./TooltipArrow";
import { TooltipContent } from "./TooltipContent";
import { TooltipMessage } from "./TooltipMessage";
import { TooltipTrigger } from "./TooltipTrigger";

export const Tooltip = Object.assign(Provider, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Message: TooltipMessage,
  Arrow: TooltipArrow,
});
