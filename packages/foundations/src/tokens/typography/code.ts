import { ComponentProps, JSX } from "react";

export type CodeVariants = "inline" | "block" | "keyboard" | "sample";

export type CodeTagOptions = Pick<
  JSX.IntrinsicElements,
  "code" | "pre" | "kbd" | "samp"
>;

export const codeTagMap: Record<CodeVariants, keyof CodeTagOptions> = {
  inline: "code",
  block: "pre",
  keyboard: "kbd",
  sample: "samp",
};

export type CodeProps<T extends keyof CodeTagOptions> = {
  variant: CodeVariants;
} & ComponentProps<T>;
