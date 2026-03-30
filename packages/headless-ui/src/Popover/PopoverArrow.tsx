import { type HTMLAttributes, useContext } from "react";

import { ContentContext, usePopover } from "./internals/contexts";

type PopoverArrowProps = Omit<HTMLAttributes<HTMLDivElement>, "aria-hidden">;

export function PopoverArrow({
  className,
  style,
  ...rest
}: Readonly<PopoverArrowProps>) {
  const { floatingStyles } = usePopover();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Popover.Arrow must be used within Popover.Content");
  }

  return (
    <div
      style={{
        ...floatingStyles.arrow,
        ...style,
      }}
      className={className}
      {...rest}
      aria-hidden="true"
    />
  );
}
