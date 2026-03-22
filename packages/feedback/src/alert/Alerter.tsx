import { ComponentType } from "react";
import { createPortal } from "react-dom";

import { useAlert } from "./manager";
import { AlertComponentProps, ConfirmComponentProps } from "./types";

type AlerterProps = {
  AlertComponent: ComponentType<AlertComponentProps>;
  ConfirmComponent: ComponentType<ConfirmComponentProps>;
};

export function Alerter({
  AlertComponent,
  ConfirmComponent,
}: Readonly<AlerterProps>) {
  const { alert, closeAlert } = useAlert();

  if (!alert) return null;

  return createPortal(
    <>
      {alert.type === "alert" ? (
        <AlertComponent alert={alert} closeAlert={closeAlert} />
      ) : (
        <ConfirmComponent confirm={alert} closeAlert={closeAlert} />
      )}
    </>,
    document.body,
  );
}
