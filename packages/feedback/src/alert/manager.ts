import { useLayoutEffect, useState } from "react";

import { AlerterObject } from "./types";

const ALERT_EVENT_NAME = "SHOW_ALERT";

let alerterMounted = false;
let alertActive = false; // 한번에 하나의 알림만 표시하도록 제어

function dispatch(options: AlerterObject): void {
  if (!alerterMounted) {
    console.warn(
      "[Alert] called without an <Alerter> mounted in the tree. " +
        "Add <Alerter /> to your app root so alerts are displayed.",
    );
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
  onClose?: () => void | Promise<void>,
  closeText: string = "Close",
): void {
  dispatch({ type: "alert", title, message, onClose, closeText });
}

export function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void | Promise<void>,
  onCancel?: () => void | Promise<void>,
  confirmText: string = "Confirm",
  cancelText: string = "Cancel",
): void {
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

  const closeAlert = async () => {
    setAlert(null);
    alertActive = false;
  };

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
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
