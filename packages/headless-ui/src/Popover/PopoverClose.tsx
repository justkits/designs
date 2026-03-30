import { type ButtonHTMLAttributes, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, usePopover } from "./internals/contexts";

type PopoverCloseProps = {
  asChild?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export function PopoverClose({
  children,
  className,
  style,
  onClick,
  asChild = false,
  ...rest
}: Readonly<PopoverCloseProps>) {
  const { hidePopover } = usePopover();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Popover.Close must be used within Popover.Content");
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await onClick?.(e);
    hidePopover();
  };

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}
