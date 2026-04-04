import { type ButtonHTMLAttributes } from "react";

import { AsChild } from "@/core/asChild";

export type ButtonProps = {
  state?: "ready" | "disabled" | "loading";
  asChild?: boolean;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "type" | "aria-disabled" | "aria-busy"
>;

export function Button({
  children,
  className,
  style,
  state = "ready",
  asChild = false,
  ...rest
}: Readonly<ButtonProps>) {
  const isDisabled = state === "disabled" || state === "loading";

  if (asChild) {
    return (
      <AsChild
        className={className}
        style={style}
        {...rest}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={state === "loading"}
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
      aria-busy={state === "loading"}
    >
      {children}
    </button>
  );
}
