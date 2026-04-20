export type BreakpointTokens = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type SimpleBreakpointQueries = {
  small: string;
  medium: string;
  large: string;
  notSmall: string;
  notLarge: string;
};

type Variants = {
  only: string;
  andSmaller: string;
  andLarger: string;
};

export type BreakpointQueries = {
  // andSmaller equals to only, and andLarger equals everything, so omit
  mobilePortrait: Omit<Variants, "andSmaller" | "andLarger">;
  mobileLandscape: Variants;
  tabletPortrait: Variants;
  tabletLandscape: Variants;
  laptop: Variants;
  // andSmaller equals everything, and andLarger equals to only, so omit
  desktop: Omit<Variants, "andSmaller" | "andLarger">;
};
