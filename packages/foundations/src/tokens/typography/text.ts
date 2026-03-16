import { ComponentProps, JSX } from "react";

export type TextVariants =
  | "hero"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "description";

export type TextTagOptions = Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
>;

export const textTagMap: Record<TextVariants, keyof TextTagOptions> = {
  hero: "h1",
  titleLarge: "h2",
  titleMedium: "h3",
  titleSmall: "h4",
  bodyLarge: "p",
  bodyMedium: "p",
  bodySmall: "p",
  description: "p",
};

export type TextProps<T extends keyof TextTagOptions> = {
  variant: TextVariants;
  as?: T;
} & ComponentProps<T>;
