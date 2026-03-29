import { type ButtonHTMLAttributes, type RefObject, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useAlert } from "./internals/contexts";

type AlertTriggerProps = {
  asChild?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick" | "aria-haspopup" | "aria-controls"
>;

export function AlertTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<AlertTriggerProps>) {
  const { showAlert, contentId, triggerRef } = useAlert();

  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "Alert.Trigger should be rendered outside of Alert.Content. Please move Alert.Trigger outside of Alert.Content to avoid unexpected behavior.",
    );
  }

  if (asChild) {
    return (
      <AsChild
        {...rest}
        aria-haspopup="dialog"
        aria-controls={contentId}
        onClick={() => showAlert()}
        ref={triggerRef}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...rest}
      aria-haspopup="dialog"
      aria-controls={contentId}
      type="button"
      onClick={() => showAlert()}
      ref={triggerRef as RefObject<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
