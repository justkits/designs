import { type ButtonHTMLAttributes, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useToast } from "./internals/contexts";

type ToastTriggerProps = {
  asChild?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export function ToastTrigger({
  asChild = false,
  children,
  ...rest
}: Readonly<ToastTriggerProps>) {
  const { showToast } = useToast();

  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "Toast.Trigger should be rendered outside of Toast.Content. Please move Toast.Trigger outside of Toast.Content.",
    );
  }

  if (asChild) {
    return (
      <AsChild {...rest} onClick={showToast}>
        {children}
      </AsChild>
    );
  }

  return (
    <button {...rest} type="button" onClick={showToast}>
      {children}
    </button>
  );
}
