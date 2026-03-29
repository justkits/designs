import { type HTMLAttributes, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext } from "./internals/contexts";

type TooltipMessageProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

export function TooltipMessage({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<TooltipMessageProps>) {
  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Tooltip.Message must be used within Tooltip.Content");
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
