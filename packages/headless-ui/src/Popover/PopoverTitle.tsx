import { type HTMLAttributes, useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, usePopover } from "./internals/contexts";

type PopoverTitleProps = {
  asChild?: boolean;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "id">;

export function PopoverTitle({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<PopoverTitleProps>) {
  const { setTitleId } = usePopover();
  const titleId = useId();

  const isInsideContent = useContext(ContentContext);

  useLayoutEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [titleId, setTitleId]);

  if (!isInsideContent) {
    throw new Error("Popover.Title must be used within Popover.Content");
  }

  if (asChild) {
    return (
      <AsChild className={className} style={style} {...rest} id={titleId}>
        {children}
      </AsChild>
    );
  }

  return (
    <h2 className={className} style={style} {...rest} id={titleId}>
      {children}
    </h2>
  );
}
