import { LabelHTMLAttributes } from "react";

import { AsChild } from "@/core/asChild";
import { useTextInput } from "./internals/contexts";

type TextInputLabelProps = {
  asChild?: boolean;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;

export function TextInputLabel({
  asChild = false,
  children,
  className,
  style,
  ...rest
}: Readonly<TextInputLabelProps>) {
  const { inputId } = useTextInput();

  if (asChild) {
    return (
      <AsChild className={className} style={style} {...rest} htmlFor={inputId}>
        {children}
      </AsChild>
    );
  }

  return (
    <label {...rest} className={className} style={style} htmlFor={inputId}>
      {children}
    </label>
  );
}
