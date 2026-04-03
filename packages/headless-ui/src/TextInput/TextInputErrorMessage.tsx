import { type HTMLAttributes, useId, useLayoutEffect } from "react";

import { AsChild } from "@/core/asChild";
import { useTextInput } from "./internals/contexts";

type TextInputErrorMessageProps = {
  asChild?: boolean;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "id">;

export function TextInputErrorMessage({
  asChild = false,
  children,
  ...rest
}: TextInputErrorMessageProps) {
  const id = useId();
  const { setErrorId } = useTextInput();

  useLayoutEffect(() => {
    setErrorId(id);
    return () => setErrorId(undefined);
  }, [id, setErrorId]);

  if (asChild) {
    return (
      <AsChild {...rest} id={id}>
        {children}
      </AsChild>
    );
  }

  return (
    <p {...rest} id={id}>
      {children}
    </p>
  );
}
