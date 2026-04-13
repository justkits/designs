import { type ReactNode } from "react";
import { Google_Sans, Kalam } from "next/font/google";
import { clsx } from "clsx";

import { Header } from "@widgets/header";
import { Footer } from "@widgets/footer";
import { styles } from "./styles.css";

type Props = {
  children: ReactNode;
};

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
  subsets: ["latin"],
});

export function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={clsx(googleSans.className, kalam.className, styles.body)}
      >
        <Header />
        <main className={styles.main} role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
