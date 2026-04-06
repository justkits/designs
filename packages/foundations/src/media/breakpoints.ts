const xs = 480; // Mobile Portrait: 0px - 480px
const sm = 767; // Mobile Landscape: 481px - 767px
const md = 1023; // Tablet Portrait: 768px - 1023px
const lg = 1279; // Tablet Landscape: 1024px - 1279px
const xl = 1440; // Desktop: 1280px and above

export const breakpointQueries = {
  simple: {
    small: `screen and (max-width: ${sm}px)`,
    medium: `screen and (min-width: ${sm + 1}px) and (max-width: ${lg}px)`,
    large: `screen and (min-width: ${lg + 1}px)`,
    notSmall: `screen and (min-width: ${sm + 1}px)`,
    notLarge: `screen and (max-width: ${lg}px)`,
  },
  only: {
    mobilePortrait: `screen and (max-width: ${xs}px)`,
    mobileLandscape: `screen and ((min-width: ${xs + 1}px) and (max-width: ${sm}px))`,
    tabletPortrait: `screen and ((min-width: ${sm + 1}px) and (max-width: ${md}px))`,
    tabletLandscape: `screen and ((min-width: ${md + 1}px) and (max-width: ${lg}px))`,
    laptop: `screen and (min-width: ${lg + 1}px) and (max-width: ${xl}px)`,
    desktop: `screen and (min-width: ${xl + 1}px)`,
  },
  below: {
    mobileLandscape: `screen and (max-width: ${sm}px)`,
    tabletPortrait: `screen and (max-width: ${md}px)`,
    tabletLandscape: `screen and (max-width: ${lg}px)`,
    laptop: `screen and (max-width: ${xl}px)`,
    desktop: `screen and (max-width: ${xl}px)`,
  },
  above: {
    mobilePortrait: `screen and (min-width: ${xs + 1}px)`,
    mobileLandscape: `screen and (min-width: ${sm + 1}px)`,
    tabletPortrait: `screen and (min-width: ${md + 1}px)`,
    tabletLandscape: `screen and (min-width: ${lg + 1}px)`,
    laptop: `screen and (min-width: ${xl + 1}px)`,
  },
};
