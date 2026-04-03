import { createContext, useContext } from "react";

type TextInputContextValue = {
  type: "text" | "password" | "email" | "url" | "search";
  required: boolean;
  disabled: boolean;
  inputId: string | undefined;
  setInputId: (id: string | undefined) => void;
  errorId: string | undefined;
  setErrorId: (id: string | undefined) => void;
};

export const TextInputContext = createContext<TextInputContextValue | null>(
  null,
);

export function useTextInput() {
  const context = useContext(TextInputContext);

  if (!context) {
    throw new Error(
      "TextInput components must be used within the TextInput wrapper",
    );
  }

  return context;
}
