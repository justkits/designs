import { type ReactNode, useMemo, useState } from "react";

import { TextInputContext } from "./internals/contexts";

type TextInputProps = {
  children: ReactNode;
  type?: "text" | "password" | "email" | "url" | "search";
  required?: boolean;
  disabled?: boolean;
};

export function Provider({
  children,
  type = "text",
  required = false,
  disabled = false,
}: Readonly<TextInputProps>) {
  const [inputId, setInputId] = useState<string | undefined>(undefined);
  const [errorId, setErrorId] = useState<string | undefined>(undefined);

  const contextValue = useMemo(
    () => ({
      type,
      required,
      disabled,
      inputId,
      setInputId,
      errorId,
      setErrorId,
    }),
    [type, required, disabled, inputId, errorId],
  );

  return (
    <TextInputContext.Provider value={contextValue}>
      {children}
    </TextInputContext.Provider>
  );
}
