import { Alerter } from "@/alert/Alerter";
import { AlertComponentProps, ConfirmComponentProps } from "@/alert/types";

function TestAlert({ alert, closeAlert }: Readonly<AlertComponentProps>) {
  const handleClose = async () => {
    await alert.onClose?.();
    await closeAlert();
  };

  return (
    <div>
      <h1>{alert.title}</h1>
      <p>{alert.message}</p>
      <button onClick={handleClose}>{alert.closeText || "Close"}</button>
    </div>
  );
}

function TestConfirm({ confirm, closeAlert }: Readonly<ConfirmComponentProps>) {
  const handleConfirm = async () => {
    await confirm.onConfirm();
    await closeAlert();
  };

  const handleCancel = async () => {
    await confirm.onCancel?.();
    await closeAlert();
  };
  return (
    <div>
      <h1>{confirm.title}</h1>
      <p>{confirm.message}</p>
      <button onClick={handleConfirm}>
        {confirm.confirmText || "Confirm"}
      </button>
      <button onClick={handleCancel}>{confirm.cancelText || "Cancel"}</button>
    </div>
  );
}

export function TestComponent() {
  return <Alerter AlertComponent={TestAlert} ConfirmComponent={TestConfirm} />;
}
