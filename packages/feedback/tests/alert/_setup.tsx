import { Alerter } from "@/alert/Alerter";
import { AlertComponentProps, ConfirmComponentProps } from "@/alert/types";

function TestAlert({ alert }: Readonly<AlertComponentProps>) {
  return (
    <div data-testid="alert-component">
      <h1>{alert.title}</h1>
      <p>{alert.message}</p>
      <button onClick={alert.onClose}>{alert.closeText}</button>
    </div>
  );
}

function TestConfirm({ confirm }: Readonly<ConfirmComponentProps>) {
  return (
    <div data-testid="confirm-component">
      <h1>{confirm.title}</h1>
      <p>{confirm.message}</p>
      <button onClick={confirm.onConfirm}>{confirm.confirmText}</button>
      <button onClick={confirm.onCancel}>{confirm.cancelText}</button>
    </div>
  );
}

export function TestComponent() {
  return <Alerter AlertComponent={TestAlert} ConfirmComponent={TestConfirm} />;
}
