import { UIProvider } from "@justkits/ui";
import clsx from "clsx";

import { fontVariables } from "./ui/fonts";
import { Header } from "./ui/Header";
import { styles } from "./styles.css";

type Props = {
  children: React.ReactNode;
};

export function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(fontVariables, styles.body)}>
        <UIProvider>
          <Header />
          <main className={styles.main} role="main">
            {children}
          </main>
          <footer role="contentinfo">Footer</footer>
        </UIProvider>
      </body>
    </html>
  );
}
