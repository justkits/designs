import { ColorSchemeProvider } from "@justkits/design-foundations/colors/scheme";

import "@justkits/design-foundations/color-scheme.css";
import "@justkits/design-foundations/reset.css";
import "./styles.css";

type Props = {
  children: React.ReactNode;
};

export function UIProvider({ children }: Readonly<Props>) {
  return <ColorSchemeProvider>{children}</ColorSchemeProvider>;
}
