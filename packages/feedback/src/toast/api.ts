import { addToast, removeToast } from "./state";
import { ToastObject, ToastType } from "./types";

function showToast(
  type: ToastType,
  message: string,
  duration: number | "infinite",
  extras?: Omit<
    ToastObject,
    "id" | "message" | "duration" | "type" | "dismiss"
  >,
): void {
  if (globalThis.window === undefined || typeof document === "undefined") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Toast] Toast cannot be shown in a non-browser environment. Ignoring toast...",
      );
    }
    return;
  }

  if (typeof duration === "number" && duration <= 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Toast] duration must be greater than 0. Ignoring toast...",
      );
    }
    return;
  }

  const id = crypto.randomUUID();

  const dismiss = () => removeToast(id);

  const toast = {
    id,
    type,
    message,
    duration,
    dismiss,
    ...extras,
  } as ToastObject;

  addToast(toast);
}

type ToastOptions = Partial<
  Omit<ToastObject, "id" | "message" | "type" | "dismiss">
>;

function defaultToast(
  message: string,
  { duration = 3000, ...extras }: ToastOptions = {},
): void {
  showToast("default", message, duration, extras);
}

function info(
  message: string,
  { duration = 3000, ...extras }: ToastOptions = {},
): void {
  showToast("info", message, duration, extras);
}

function success(
  message: string,
  { duration = 3000, ...extras }: ToastOptions = {},
): void {
  showToast("success", message, duration, extras);
}

function warning(
  message: string,
  { duration = 3000, ...extras }: ToastOptions = {},
): void {
  showToast("warning", message, duration, extras);
}

function error(
  message: string,
  { duration = 3000, ...extras }: ToastOptions = {},
): void {
  showToast("error", message, duration, extras);
}

/**
 * Imperative API for showing toasts.
 *
 * **Requires** the `Toaster` provider component to be mounted at the root of your application.
 *
 * Call `toast(message)` for a default toast, or use a typed sub-method for semantic variants.
 *
 * @example
 * toast("Saved");
 * toast.success("File uploaded");
 * toast.error("Something went wrong", { duration: "infinite" });
 */
export const toast = Object.assign(defaultToast, {
  info,
  success,
  warning,
  error,
});
