import { AlertButton } from "./AlertButton";
import { AlertContent } from "./AlertContent";
import { AlertOverlay } from "./AlertOverlay";
import { AlertMessage, AlertTitle } from "./AlertTexts";
import { AlertTrigger } from "./AlertTrigger";
import { Provider } from "./Provider";

export const Alert = Object.assign(Provider, {
  Trigger: AlertTrigger,
  Overlay: AlertOverlay,
  Content: AlertContent,
  Title: AlertTitle,
  Message: AlertMessage,
  Button: AlertButton,
});
