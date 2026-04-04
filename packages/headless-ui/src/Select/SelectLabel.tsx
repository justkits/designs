import { useContext, type LabelHTMLAttributes } from "react";

import { AsChild } from "@/core/asChild";
import { MenuContext, TriggerContext, useSelect } from "./internals/contexts";

type SelectLabelProps = {
  asChild?: boolean;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor">;

export function SelectLabel({
  asChild = false,
  children,
  className,
  style,
  ...rest
}: Readonly<SelectLabelProps>) {
  const { triggerId } = useSelect();

  const isInsideTrigger = useContext(TriggerContext);

  if (isInsideTrigger && process.env.NODE_ENV !== "production") {
    console.warn(
      "Select.Label should not be used inside Select.Trigger. Please move it outside of the trigger component.",
    );
  }

  const isInsideMenu = useContext(MenuContext);

  if (isInsideMenu && process.env.NODE_ENV !== "production") {
    console.warn(
      "Select.Label should not be used inside Select.Menu. Please move it outside of the menu component.",
    );
  }

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        {...rest}
        htmlFor={triggerId}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <label {...rest} className={className} style={style} htmlFor={triggerId}>
      {children}
    </label>
  );
}
