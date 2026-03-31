import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useContext,
  useEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useToast } from "./internals/contexts";

type ToastCloseProps = {
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export function ToastClose({
  className,
  style,
  children,
  onClick,
  asChild = false,
  disabled,
  ...rest
}: Readonly<ToastCloseProps>) {
  const { dismissToast, isPending, setPending, pauseTimer, resumeTimer } =
    useToast();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Toast.Close must be used within Toast.Content.");
  }

  useEffect(() => {
    return () => setPending(false);
  }, [setPending]);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(e);
    if (!(result instanceof Promise)) {
      dismissToast();
      return;
    }

    setPending(true);
    pauseTimer();

    try {
      await result;
      dismissToast();
    } catch {
      // Promise가 거부되면, Toast는 닫히지 않고 pending 상태도 해제되어야 한다.
      resumeTimer();
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
      className={className}
      style={style}
      {...rest}
      disabled={isPending || disabled}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}
