import { AnimationDelay } from "@/tokens/delay";
import { AnimationDuration } from "@/tokens/duration";
import {
  AnimationEasingOptions,
  AnimationTimingFunction,
  resolveEasing,
} from "@/tokens/easing";
import { AnimationIterations } from "@/tokens/iterations";
import { PresetKeyframesNames } from "@/tokens/name";

export type LoopAnimationNames = Extract<
  PresetKeyframesNames,
  "rotate-cw" | "rotate-ccw" | "bounce" | "swing"
>;

export type LoopAnimationOptions = {
  name: LoopAnimationNames;
  easing?: AnimationEasingOptions;
  duration?: AnimationDuration;
  iterations?: AnimationIterations;
  delay?: AnimationDelay;
  isLooping?: boolean;
};

export function resolveDuration(
  name: LoopAnimationNames,
  duration: AnimationDuration,
): number {
  let scale = 1;

  if (name === "bounce" || name === "swing") scale = 3.3;

  if (duration === "fast") return Math.round(600 * scale);
  if (duration === "normal") return Math.round(800 * scale);
  if (duration === "slow") return Math.round(1000 * scale);

  return Math.round(duration * scale);
}

export function resolveTiming(
  name: LoopAnimationNames,
  easing: AnimationEasingOptions | undefined,
): AnimationTimingFunction {
  if (easing) return resolveEasing(easing);

  if (name === "rotate-cw" || name === "rotate-ccw") return "linear";

  return resolveEasing("justkits-1");
}
