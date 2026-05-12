import {
  Google_Sans,
  JetBrains_Mono,
  Kalam,
  Roboto_Slab,
} from "next/font/google";
import clsx from "clsx";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-family-normal",
  fallback: ["system-ui"],
  display: "swap",
  preload: true,
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-family-code",
  fallback: ["monospace"],
  display: "swap",
  preload: true,
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-family-brand",
  display: "swap",
  preload: true,
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-family-quote",
  fallback: ["serif"],
  display: "swap",
  preload: true,
});

export const fontVariables = clsx(
  googleSans.variable,
  jetBrainsMono.variable,
  kalam.variable,
  robotoSlab.variable,
);
