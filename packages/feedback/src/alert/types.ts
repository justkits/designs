export type AlertObject = {
  type: "alert";
  title: string;
  message: string;
  onClose?: () => void | Promise<void>;
  closeText?: string;
};

export type AlertComponentProps = {
  alert: AlertObject;
  closeAlert: () => Promise<void>;
};

export type ConfirmObject = {
  type: "confirm";
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
};

export type ConfirmComponentProps = {
  confirm: ConfirmObject;
  closeAlert: () => Promise<void>;
};

export type AlerterObject = AlertObject | ConfirmObject;
