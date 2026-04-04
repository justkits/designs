import { type CSSProperties } from "react";

import { resolveEasing } from "@/tokens/easing";
import { type PresetKeyframesNames } from "@/tokens/name";
import { generateStyleFromPreset } from "@/utils/generateStyleFromPreset";
import { resolveDuration, type TransitionAnimationOptions } from "./lib";

export function transition({
  name,
  easing = "justkits-1",
  duration = "normal",
  delay = "short",
  exiting = false,
}: TransitionAnimationOptions): CSSProperties {
  if (exiting) {
    const exitName = `${name}-out` as PresetKeyframesNames;
    return generateStyleFromPreset(
      exitName,
      resolveEasing(easing),
      resolveDuration(duration),
      1,
      delay,
    );
  }

  const entryName = `${name}-in` as PresetKeyframesNames;

  return generateStyleFromPreset(
    entryName,
    resolveEasing(easing),
    resolveDuration(duration),
    1,
    delay,
  );
}
