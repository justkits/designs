import { type HTMLAttributes, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, usePopover } from "./internals/contexts";

type PopoverTitleProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;

export function PopoverTitle({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<PopoverTitleProps>) {
  const { titleId } = usePopover();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Popover.Title must be used within Popover.Content");
  }

  if (asChild) {
    return (
      <AsChild id={titleId} className={className} style={style} {...rest}>
        {children}
      </AsChild>
    );
  }

  return (
    <h2 id={titleId} className={className} style={style} {...rest}>
      {children}
    </h2>
  );
}
