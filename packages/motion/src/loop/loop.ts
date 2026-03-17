import { CSSProperties } from "react";

import { generateStyleFromPreset } from "@/utils/generateStyleFromPreset";
import { LoopAnimationOptions, resolveDuration, resolveTiming } from "./lib";

export function loop({
  name,
  easing,
  duration = "normal",
  iterations = "infinite",
  delay = "short",
  isLooping = true,
}: LoopAnimationOptions): CSSProperties {
  if (!isLooping) return {};

  if (iterations !== "infinite" && iterations <= 0) {
    iterations = "infinite";
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `Invalid iteration value for animation "${name}". Defaulting to "infinite".`,
      );
    }
  } else if (iterations === 1 && process.env.NODE_ENV !== "production") {
    console.warn(
      `Iteration value of 1 for animation "${name}" will not loop. Consider using a value greater than 1 or switch to a non-looping animation.`,
    );
  }

  return generateStyleFromPreset(
    name,
    resolveTiming(name, easing),
    resolveDuration(name, duration),
    iterations,
    delay,
  );
}
