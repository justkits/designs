import { ComponentType, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { getSnapshot, subscribe } from "./state";
import { ToastsComponentProps } from "./types";

type ToasterProps = {
  ToastsComponent: ComponentType<ToastsComponentProps>;
  maxToasts?: number;
};

/**
 * Portal component that renders active toasts into `document.body`.
 *
 * Mount this once near the root of your app. Renders nothing during SSR.
 *
 * **Required:** `toast` will only work if this provider component is mounted at the root of your application.
 *
 * @param ToastsComponent - Your component that receives and renders the list of active toasts.
 * @param maxToasts - Maximum number of toasts shown simultaneously. Defaults to `5`.
 */
export function Toaster({
  ToastsComponent,
  maxToasts = 5,
}: Readonly<ToasterProps>) {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, () => []);

  if (maxToasts <= 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Toast] maxToasts must be greater than 0. No toasts will be shown.",
      );
    }

    return null;
  }

  if (globalThis.window === undefined || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <ToastsComponent toasts={toasts.slice(0, maxToasts)} />,
    document.body,
  );
}
