export type ToastType = "info" | "success" | "warning" | "error" | "default";

export interface ToastObject {
  id: string;
  type: ToastType;
  message: string;
  duration: number | "infinite";
  dismiss: () => void;
}

export type ToastsComponentProps = {
  toasts: ToastObject[];
};
