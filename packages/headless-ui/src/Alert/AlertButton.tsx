import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useContext,
  useEffect,
} from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useAlert } from "./internals/context";

type AlertButtonProps = {
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export function AlertButton({
  children,
  className,
  style,
  onClick,
  asChild = false,
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

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    setPending(true);
    try {
      await onClick?.(e);
      setPending(false);
      closeAlert();
    } catch {
      // onClick rejected: dialog stays open, developer handles the error
      setPending(false);
    }
  };

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        onClick={handleClick}
        disabled={isPending}
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
      disabled={isPending}
      {...rest}
    >
      {children}
    </button>
  );
}
