import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useContext,
  useEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useAlert } from "./internals/contexts";

type AlertButtonProps = {
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export function AlertButton({
  children,
  className,
  style,
  onClick,
  asChild = false,
  disabled,
  ...rest
}: Readonly<AlertButtonProps>) {
  const { closeAlert, isPending, setPending } = useAlert();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Alert.Button must be used within Alert.Content");
  }

  useEffect(() => {
    return () => setPending(false);
  }, [setPending]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(e);
    if (!(result instanceof Promise)) {
      closeAlert();
      return;
    }
    setPending(true);
    result
      .then(() => {
        setPending(false);
        closeAlert();
      })
      .catch(() => {
        setPending(false);
      });
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
