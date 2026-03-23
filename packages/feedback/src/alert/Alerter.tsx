import { ComponentType, Fragment, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { getSnapshot, subscribe } from "./state";
import { AlertComponentProps, ConfirmComponentProps } from "./types";

type AlerterProps = {
  AlertComponent: ComponentType<AlertComponentProps>;
  ConfirmComponent: ComponentType<ConfirmComponentProps>;
};

/**
 * Portal component that renders the active alert or confirm dialog into `document.body`.
 *
 * Mount this once near the root of your app and pass your own styled components for
 * `AlertComponent` and `ConfirmComponent`. Renders nothing during SSR or when no dialog is active.
 *
 * **Required:** `showAlert` and `showConfirm` will only work if this provider component is mounted
 * at the root of your application.
 */
export function Alerter({
  AlertComponent,
  ConfirmComponent,
}: Readonly<AlerterProps>) {
  const alert = useSyncExternalStore(subscribe, getSnapshot, () => null);

  if (
    !alert ||
    globalThis.window === undefined ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return createPortal(
    <Fragment>
      {alert.type === "alert" ? (
        <AlertComponent alert={alert} />
      ) : (
        <ConfirmComponent confirm={alert} />
      )}
    </Fragment>,
    document.body,
  );
}
