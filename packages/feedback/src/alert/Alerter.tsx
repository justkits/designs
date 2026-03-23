import { ComponentType, Fragment, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { getSnapshot, subscribe } from "./state";
import { AlertComponentProps, ConfirmComponentProps } from "./types";

type AlerterProps = {
  AlertComponent: ComponentType<AlertComponentProps>;
  ConfirmComponent: ComponentType<ConfirmComponentProps>;
};

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
