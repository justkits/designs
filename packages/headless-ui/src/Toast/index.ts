import { ToastClose } from "./ToastClose";
import { ToastContent } from "./ToastContent";
import { ToastMessage } from "./ToastMessage";
import { ToastTrigger } from "./ToastTrigger";
import { ToastProvider } from "./Provider";

export const Toast = Object.assign(ToastProvider, {
  Trigger: ToastTrigger,
  Content: ToastContent,
  Message: ToastMessage,
  Close: ToastClose,
});
