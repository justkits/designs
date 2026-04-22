export interface TypographyTokens {
  fontSize: {
    headingSmall: string;
    headingMedium: string;
    headingLarge: string;
    bodySmall: string;
    bodyMedium: string;
    bodyLarge: string;
  };
  lineHeight: {
    headingSmall: string;
    headingMedium: string;
    headingLarge: string;
    bodySmall: string;
    bodyMedium: string;
    bodyLarge: string;
  };

  fontWeight: {
    regular: string;
    semibold: string;
    bold: string;
  };
  fontFamily: {
    brand: string;
    normal: string;
    code: string;
    quote: string;
  };
}

export interface TextTokens {
  // headings
  hero: string;
  titleLarge: string;
  titleMedium: string;
  titleSmall: string;
  // body
  bodyLarge: string;
  bodyMedium: string;
  bodySmall: string;
  description: string;
  // others
  code: string;
  quote: string;
}
