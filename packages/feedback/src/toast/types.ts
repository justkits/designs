export type ToastType = "info" | "success" | "warning" | "error" | "default";

/**
 * Represents an active toast. Declared as an `interface` so you can add custom fields
 * via module augmentation in a `.d.ts` file.
 *
 * @see {@link https://github.com/justkits/design-system/packages/feedback/README.md#extending-toastobject}
 */
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
