import { useCallback, useState } from "react";

import { useIsomorphicLayoutEffect } from "@/_useIsomorphicLayoutEffect";
import { AlerterObject } from "./types";

const ALERT_EVENT_NAME = "SHOW_ALERT";

let alerterMounted = false;
let alertActive = false; // 한번에 하나의 알림만 표시하도록 제어

function dispatch(options: AlerterObject): void {
  if (typeof document === "undefined") return;

  if (!alerterMounted) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Alert] called without an <Alerter> mounted in the tree. " +
          "Add <Alerter /> to your app root so alerts are displayed.",
      );
    }
    return;
  }

  if (alertActive) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Alert] called while another alert is in progress. Ignoring this call — in production, this is silently dropped with no warning.",
      );
    }
    return;
  }

  document.dispatchEvent(
    new CustomEvent(ALERT_EVENT_NAME, { detail: options }),
  );
}

export function showAlert(
  title: string,
  message: string,
  options?: {
    onClose?: () => void | Promise<void>;
    closeText?: string;
  },
): void {
  const { onClose, closeText = "Close" } = options ?? {};
  dispatch({ type: "alert", title, message, onClose, closeText });
}

export function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void | Promise<void>,
  options?: {
    onCancel?: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
  },
): void {
  const {
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = options ?? {};
  dispatch({
    type: "confirm",
    title,
    message,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
  });
}

// =============== React =============== //

export function useAlert() {
  const [alert, setAlert] = useState<AlerterObject | null>(null);

  const closeAlert = useCallback(async () => {
    setAlert(null);
    // alertActive is reset in the layout effect below, after React commits the null
    // state. This prevents a new alert from being dispatched before the old one
    // has finished unmounting.
  }, []);

  // Reset alertActive only after React has committed the null state so that
  // callers cannot dispatch a new alert before the old one has been removed
  // from the DOM.
  useIsomorphicLayoutEffect(() => {
    if (alert === null) {
      alertActive = false;
    }
  }, [alert]);

  useIsomorphicLayoutEffect(() => {
    const handleShowAlert = (event: Event) => {
      const newAlert = (event as CustomEvent<AlerterObject>).detail;

      setAlert(newAlert);
      alertActive = true;
    };

    document.addEventListener(ALERT_EVENT_NAME, handleShowAlert);

    return () => {
      document.removeEventListener(ALERT_EVENT_NAME, handleShowAlert);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    // register
    alerterMounted = true;

    return () => {
      // unregister
      alerterMounted = false;
      alertActive = false;
    };
  }, []);

  return { alert, closeAlert };
}
