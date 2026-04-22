import { type ButtonHTMLAttributes } from "react";

import { AsChild } from "@/core/asChild";

export type ButtonProps = {
  isLoading?: boolean;
  asChild?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "aria-disabled" | "aria-busy"
>;

export function Button({
  children,
  className,
  style,
  asChild = false,
  disabled,
  isLoading = false,
  ...rest
}: Readonly<ButtonProps>) {
  const isDisabled = disabled || isLoading;

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        {...rest}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <button
      {...rest}
      className={className}
      style={style}
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
    >
      {children}
    </button>
  );
}
