import {
  type FormHTMLAttributes,
  type SubmitEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import { useSubmitOnEnter } from "@/core/keyboard/useSubmitOnEnter";
import { FormContext } from "./internals/contexts";

export type FormProps = {
  onSubmit: (formData?: FormData) => void | Promise<void>;
  disabled?: boolean;
} & Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "noValidate">;

export function Provider({
  children,
  onSubmit,
  disabled,
  className,
  style,
  ...rest
}: Readonly<FormProps>) {
  const [isPending, setPending] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  useSubmitOnEnter(formRef);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disabled || isPending) return;

    const formData = new FormData(e.currentTarget);
    const result = onSubmit(formData);

    if (!(result instanceof Promise)) {
      return;
    }

    setPending(true);
    try {
      await result;
    } catch {
      // Promise가 거부되면 pending 상태만 해제한다.
    } finally {
      setPending(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      disabled: disabled || isPending,
    }),
    [disabled, isPending],
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form
        {...rest}
        className={className}
        style={style}
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
