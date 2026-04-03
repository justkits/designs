import { type InputHTMLAttributes, useId, useLayoutEffect } from "react";

import { AsChild } from "@/core/asChild";
import { useTextInput } from "./internals/contexts";

type TextInputProps = { asChild?: boolean } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "id"
  | "type"
  | "aria-describedby"
  | "aria-invalid"
  | "aria-required"
  | "required"
  | "disabled"
>;

export function TextInput({
  asChild = false,
  children,
  ...rest
}: Readonly<TextInputProps>) {
  const id = useId();
  const { type, required, disabled, errorId, setInputId } = useTextInput();

  useLayoutEffect(() => {
    setInputId(id);
    return () => setInputId(undefined);
  }, [id, setInputId]);

  if (asChild) {
    return (
      <AsChild
        {...rest}
        id={id}
        type={type}
        aria-describedby={errorId}
        aria-invalid={!!errorId}
        aria-required={required}
        aria-disabled={disabled}
        required={required}
        disabled={disabled}
      >
        {children}
      </AsChild>
    );
  }

  return (
    <input
      {...rest}
      id={id}
      type={type}
      aria-describedby={errorId}
      aria-invalid={!!errorId}
      aria-required={required}
      aria-disabled={disabled}
      required={required}
      disabled={disabled}
    />
  );
}
