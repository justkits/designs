import { type HTMLAttributes, type JSX } from "react";

export type TagOptions = Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
>;

export type TextVariants =
  | "hero"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "description";

const defaultTagMap: Record<TextVariants, keyof TagOptions> = {
  hero: "h1",
  titleLarge: "h2",
  titleMedium: "h3",
  titleSmall: "h4",
  bodyLarge: "p",
  bodyMedium: "p",
  bodySmall: "p",
  description: "p",
};

type TextProps<T extends TextVariants> = {
  variant: T;
  as?: keyof TagOptions;
  tagMap?: Record<T, keyof TagOptions>;
} & HTMLAttributes<HTMLElement>;

export function Text<T extends TextVariants>({
  variant,
  as,
  children,
  tagMap = defaultTagMap,
  ...rest
}: Readonly<TextProps<T>>) {
  const Component = as || tagMap[variant];

  return <Component {...rest}>{children}</Component>;
}
