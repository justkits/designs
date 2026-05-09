export interface LinkFeatures {
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
}

export interface LinkProps
  extends
    LinkFeatures,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "target" | "rel" | "aria-disabled" | "aria-current"
    > {
  asChild?: boolean;
}
