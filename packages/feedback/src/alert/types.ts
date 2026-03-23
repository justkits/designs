export type AlertObject = {
  type: "alert";
  title: string;
  message: string;
  /** Dismisses the alert. Already wired by `showAlert` — call this to close the dialog. */
  onClose: () => void | Promise<void>;
  closeText: string;
};

export type AlertComponentProps = {
  alert: AlertObject;
};

export type ConfirmObject = {
  type: "confirm";
  title: string;
  message: string;
  /** Called when the user confirms. Dismisses the dialog after it resolves. */
  onConfirm: () => void | Promise<void>;
  /** Called when the user cancels. Dismisses the dialog after it resolves. */
  onCancel: () => void | Promise<void>;
  confirmText: string;
  cancelText: string;
};

export type ConfirmComponentProps = {
  confirm: ConfirmObject;
};

export type AlerterObject = AlertObject | ConfirmObject;
