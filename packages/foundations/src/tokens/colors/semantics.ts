export type ColorTokens = {
  primary: {
    default: string;
    hover: string;
    foreground: string;
  };
  secondary: {
    default: string;
    hover: string;
    foreground: string;
  };
  alert: {
    danger: string;
    warning: string;
    success: string;
    info: string;
  };
  background: {
    default: string;
    surface: string;
    subtle: string;
    overlay: string;
    disabled: string;
  };
  text: {
    default: string;
    muted: string;
    disabled: string;
  };
  border: {
    default: string;
    muted: string;
    inverted: string;
    invertedMuted: string;
  };
};
