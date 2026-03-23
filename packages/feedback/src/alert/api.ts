import { dispatch } from "./state";
import { AlertObject, ConfirmObject } from "./types";

type AlertOptions = Partial<Pick<AlertObject, "onClose" | "closeText">>;

/**
 * Displays an alert dialog imperatively.
 *
 * **Requires** the `Alerter` provider component to be mounted at the root of your application.
 *
 * Only one dialog can be active at a time. If called while another alert or confirm
 * is already shown, this call is silently dropped (with a warning in development).
 *
 * @param title - The dialog title.
 * @param message - The body message.
 * @param options - Optional overrides for `closeText` and an `onClose` callback.
 */
export function showAlert(
  title: string,
  message: string,
  options?: AlertOptions,
): void {
  const finalOnClose = async () => {
    await options?.onClose?.();
    dispatch(null);
  };

  const alert: AlertObject = {
    type: "alert",
    title,
    message,
    onClose: finalOnClose,
    closeText: options?.closeText ?? "닫기",
  };

  dispatch(alert);
}

type ConfirmOptions = Partial<
  Pick<ConfirmObject, "onCancel" | "confirmText" | "cancelText">
>;

/**
 * Displays a confirm dialog imperatively.
 *
 * **Requires** the `Alerter` provider component to be mounted at the root of your application.
 *
 * Only one dialog can be active at a time. If called while another alert or confirm
 * is already shown, this call is silently dropped (with a warning in development).
 *
 * @param title - The dialog title.
 * @param message - The body message.
 * @param onConfirm - Called when the user confirms. The dialog is dismissed automatically after this resolves.
 * @param options - Optional overrides for `confirmText`, `cancelText`, and an `onCancel` callback.
 */
export function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void | Promise<void>,
  options?: ConfirmOptions,
): void {
  const finalOnCancel = async () => {
    await options?.onCancel?.();
    dispatch(null);
  };

  const finalOnConfirm = async () => {
    await onConfirm();
    dispatch(null);
  };

  const confirm: ConfirmObject = {
    type: "confirm",
    title,
    message,
    onConfirm: finalOnConfirm,
    onCancel: finalOnCancel,
    confirmText: options?.confirmText ?? "확인",
    cancelText: options?.cancelText ?? "취소",
  };

  dispatch(confirm);
}
