import { TextInputErrorMessage } from "./TextInputErrorMessage";
import { TextInput as Input } from "./TextInput";
import { TextInputLabel } from "./TextInputLabel";
import { Provider } from "./Provider";

export const TextInput = Object.assign(Provider, {
  Label: TextInputLabel,
  ErrorMessage: TextInputErrorMessage,
  Input: Input,
});
