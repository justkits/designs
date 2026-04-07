import { type ReactNode, useId, useMemo, useState } from "react";

import { FormFieldContext } from "./internals/contexts";

export type FieldProps = {
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
};

export function Provider({
  children,
  required = false,
  disabled = false,
}: Readonly<FieldProps>) {
  const controlId = useId();
  const [descriptionId, setDescriptionId] = useState<string | undefined>(
    undefined,
  );
  const [errorId, setErrorId] = useState<string | undefined>(undefined);

  const contextValue = useMemo(
    () => ({
      disabled,
      required,
      controlId,
      descriptionId,
      setDescriptionId,
      errorId,
      setErrorId,
    }),
    [disabled, required, controlId, descriptionId, errorId],
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      {children}
    </FormFieldContext.Provider>
  );
}
