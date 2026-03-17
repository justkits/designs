export { loop } from "./loop/loop";
export { useLoop } from "./loop/useLoop";
export { transition } from "./transition/transition";
export { useAnimatedExit } from "./transition/useAnimatedExit";

// types
export type { LoopAnimationNames, LoopAnimationOptions } from "./loop/lib";
export type {
  TransitionAnimationNames,
  TransitionAnimationOptions,
} from "./transition/lib";

export type { AnimationDelay } from "@/tokens/delay";
export type { AnimationDuration } from "@/tokens/duration";
export type { AnimationEasingOptions } from "@/tokens/easing";
export type { AnimationIterations } from "@/tokens/iterations";
export type { PresetKeyframesNames } from "@/tokens/name";
