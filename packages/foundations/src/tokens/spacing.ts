export type SpacingTokens = {
  atoms: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  sections: {
    sm: string;
    lg: string;
  };
  layouts: {
    sm: string;
    lg: string;
  };
};

export const spacingVariables: SpacingTokens = {
  atoms: {
    xs: "spacing-atoms-xs",
    sm: "spacing-atoms-sm",
    md: "spacing-atoms-md",
    lg: "spacing-atoms-lg",
    xl: "spacing-atoms-xl",
  },
  sections: {
    sm: "spacing-sections-sm",
    lg: "spacing-sections-lg",
  },
  layouts: {
    sm: "spacing-layouts-sm",
    lg: "spacing-layouts-lg",
  },
};

export const spacingCSSVariables: SpacingTokens = {
  atoms: {
    xs: `var(--spacing-atoms-xs)`,
    sm: `var(--spacing-atoms-sm)`,
    md: `var(--spacing-atoms-md)`,
    lg: `var(--spacing-atoms-lg)`,
    xl: `var(--spacing-atoms-xl)`,
  },
  sections: {
    sm: `var(--spacing-sections-sm)`,
    lg: `var(--spacing-sections-lg)`,
  },
  layouts: {
    sm: `var(--spacing-layouts-sm)`,
    lg: `var(--spacing-layouts-lg)`,
  },
};
