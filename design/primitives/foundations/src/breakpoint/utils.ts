import type {
  BreakpointQueries,
  BreakpointTokens,
  SimpleBreakpointQueries,
} from "./types";
import { defaultBreakpoints } from "./variables";

export function createSimpleBreakpointQueries({
  sm,
  lg,
}: Omit<
  BreakpointTokens,
  "xs" | "md" | "xl"
> = defaultBreakpoints): SimpleBreakpointQueries {
  return {
    small: `screen and (max-width: ${sm})`,
    medium: `screen and (min-width: ${sm}) and (max-width: ${lg})`,
    large: `screen and (min-width: ${lg})`,
    notSmall: `screen and (min-width: ${sm})`,
    notLarge: `screen and (max-width: ${lg})`,
  };
}

export function createBreakpointQueries({
  xs,
  sm,
  md,
  lg,
  xl,
}: BreakpointTokens = defaultBreakpoints): BreakpointQueries {
  return {
    mobilePortrait: {
      only: `screen and (max-width: ${xs})`,
    },
    mobileLandscape: {
      only: `screen and ((min-width: ${xs}) and (max-width: ${sm}))`,
      andSmaller: `screen and (max-width: ${sm})`,
      andLarger: `screen and (min-width: ${xs})`,
    },
    tabletPortrait: {
      only: `screen and ((min-width: ${sm}) and (max-width: ${md}))`,
      andSmaller: `screen and (max-width: ${md})`,
      andLarger: `screen and (min-width: ${sm})`,
    },
    tabletLandscape: {
      only: `screen and ((min-width: ${md}) and (max-width: ${lg}))`,
      andSmaller: `screen and (max-width: ${lg})`,
      andLarger: `screen and (min-width: ${md})`,
    },
    laptop: {
      only: `screen and (min-width: ${lg}) and (max-width: ${xl})`,
      andSmaller: `screen and (max-width: ${xl})`,
      andLarger: `screen and (min-width: ${lg})`,
    },
    desktop: {
      only: `screen and (min-width: ${xl})`,
    },
  };
}
