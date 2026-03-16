import { ComponentProps, JSX } from "react";

export type QuoteVariants = "block" | "inline" | "citation";

export type QuoteTagOptions = Pick<
  JSX.IntrinsicElements,
  "blockquote" | "q" | "cite"
>;

export const quoteTagMap: Record<QuoteVariants, keyof QuoteTagOptions> = {
  block: "blockquote",
  inline: "q",
  citation: "cite",
};

export type QuoteProps<T extends keyof QuoteTagOptions> = {
  variant: QuoteVariants;
} & ComponentProps<T>;
