import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useContext,
  useEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, usePopover } from "./internals/contexts";

type PopoverCloseProps = {
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export function PopoverClose({
  children,
  className,
  style,
  onClick,
  asChild = false,
  disabled,
  ...rest
}: Readonly<PopoverCloseProps>) {
  const { hidePopover, isPending, setPending } = usePopover();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Popover.Close must be used within Popover.Content");
  }

  useEffect(() => {
    return () => setPending(false);
  }, [setPending]);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(e);
    if (!(result instanceof Promise)) {
      hidePopover();
      return;
    }
    setPending(true);
    try {
      await result;
      hidePopover();
    } catch {
      // Promise가 거부되면, Popover는 닫히지 않고 pending 상태도 해제되어야 한다.
    } finally {
      setPending(false);
    }
  };

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        {...rest}
        disabled={isPending || disabled}
        onClick={handleClick}
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
      {...rest}
      disabled={isPending || disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
