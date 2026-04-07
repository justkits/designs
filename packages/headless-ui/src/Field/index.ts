import { Provider } from "./Provider";
import { FieldControl } from "./FieldControl";
import { FieldLabel } from "./FieldLabel";
import { FieldDescription } from "./FieldDescription";
import { FieldErrorMessage } from "./FieldErrorMessage";

export type { FieldProps } from "./Provider";

export const Field = Object.assign(Provider, {
  Control: FieldControl,
  Label: FieldLabel,
  Description: FieldDescription,
  ErrorMessage: FieldErrorMessage,
});
