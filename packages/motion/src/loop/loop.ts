import { type CSSProperties } from "react";

import { generateStyleFromPreset } from "@/utils/generateStyleFromPreset";
import {
  type LoopAnimationOptions,
  resolveDuration,
  resolveTiming,
} from "./lib";

export function loop({
  name,
  easing,
  duration = "normal",
  iterations = "infinite",
  delay = "short",
  isLooping = true,
}: LoopAnimationOptions): CSSProperties {
  if (!isLooping) return {};

  let resolvedIterations = iterations;

  if (resolvedIterations !== "infinite" && resolvedIterations <= 0) {
    resolvedIterations = "infinite"; // NOSONAR
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Invalid iteration value for animation "${name}". Defaulting to "infinite".`,
      );
    }
  } else if (
    resolvedIterations === 1 &&
    process.env.NODE_ENV !== "production"
  ) {
    console.warn(
      `Iteration value of 1 for animation "${name}" will not loop. Consider using a value greater than 1 or switch to a non-looping animation.`,
    );
  }

  return generateStyleFromPreset(
    name,
    resolveTiming(name, easing),
    resolveDuration(name, duration),
    resolvedIterations,
    delay,
  );
}
