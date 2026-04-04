import { type CSSProperties } from "react";

import { type AnimationDelay, resolveDelay } from "@/tokens/delay";
import { type AnimationTimingFunction } from "@/tokens/easing";
import { type AnimationIterations } from "@/tokens/iterations";
import { type PresetKeyframesNames } from "@/tokens/name";
import { prefersReducedMotion } from "./reduced-motion";

export function generateStyleFromPreset(
  name: PresetKeyframesNames,
  easing: AnimationTimingFunction,
  duration: number,
  iterations: AnimationIterations,
  delay: AnimationDelay,
): CSSProperties {
  if (prefersReducedMotion()) return {};

  return {
    animationName: name,
    animationTimingFunction: easing,
    animationDuration: duration + "ms",
    animationIterationCount: iterations,
    animationDelay: resolveDelay(delay),
    animationFillMode: "both",
  };
}
