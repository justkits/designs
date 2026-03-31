import { type HTMLAttributes, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext } from "./internals/contexts";

type ToastMessageProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

export function ToastMessage({
  className,
  style,
  children,
  asChild = false,
  ...rest
}: Readonly<ToastMessageProps>) {
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Toast.Message must be used within Toast.Content.");
  }

  if (asChild) {
    return (
      <AsChild className={className} style={style} {...rest}>
        {children}
      </AsChild>
    );
  }

  return (
    <p className={className} style={style} {...rest}>
      {children}
    </p>
  );
}
