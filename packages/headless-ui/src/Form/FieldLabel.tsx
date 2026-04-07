import { type LabelHTMLAttributes, type ReactNode } from "react";

import { AsChild } from "@/core/asChild";
import { useField } from "./internals/contexts";

type NormalLabelProps = {
  asChild?: false;
  children: string;
};

type AsChildLabelProps = {
  asChild: true;
  children: ReactNode;
};

type FieldLabelProps = (NormalLabelProps | AsChildLabelProps) &
  Omit<LabelHTMLAttributes<HTMLLabelElement>, "id" | "htmlFor">;

export function FieldLabel({
  asChild = false,
  children,
  ...rest
}: FieldLabelProps) {
  const { controlId } = useField(
    "Field.Label must be used within the Field wrapper.",
  );

  if (asChild) {
    return (
      <AsChild {...rest} htmlFor={controlId}>
        {children}
      </AsChild>
    );
  }

  return (
    <label {...rest} htmlFor={controlId}>
      {children}
    </label>
  );
}
