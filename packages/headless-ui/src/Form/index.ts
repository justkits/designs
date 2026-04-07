import { FormField } from "./Field";
import { FieldControl } from "./FieldControl";
import { FieldLabel } from "./FieldLabel";
import { FieldDescription } from "./FieldDescription";
import { FieldErrorMessage } from "./FieldErrorMessage";

import { Provider } from "./Provider";
import { FormSubmit } from "./FormSubmit";
import { FormError } from "./FormError";

export type { FormProps } from "./Provider";

export const Form = Object.assign(Provider, {
  Submit: FormSubmit,
  Error: FormError,
});

export const Field = Object.assign(FormField, {
  Control: FieldControl,
  Label: FieldLabel,
  Description: FieldDescription,
  ErrorMessage: FieldErrorMessage,
});
