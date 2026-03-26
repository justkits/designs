import {
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from "react";

type AnyProps = Record<string, unknown>;

function mergeProps(props: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...props };

  for (const key in childProps) {
    const slotVal = props[key];
    const childVal = childProps[key];

    if (
      key.startsWith("on") &&
      typeof slotVal === "function" &&
      typeof childVal === "function"
    ) {
      // Chain handlers: child fires first, then slot
      merged[key] = (...args: unknown[]) => {
        (childVal as (...a: unknown[]) => void)(...args);
        (slotVal as (...a: unknown[]) => void)(...args);
      };
    } else if (key === "className") {
      merged[key] = [slotVal as string, childVal as string]
        .filter(Boolean)
        .join(" ");
    } else if (key === "style") {
      merged[key] = { ...(slotVal as object), ...(childVal as object) };
    } else {
      // Child props override slot props for everything else
      merged[key] = childVal;
    }
  }

  return merged;
}

type AsChildProps = {
  children: ReactNode;
} & AnyProps;

export function AsChild({
  children,
  ...props
}: AsChildProps): ReactElement | null {
  if (!isValidElement(children)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[AsChild] asChild requires a single valid React element as child.",
      );
    }
    return null;
  }

  return cloneElement(children, mergeProps(props, children.props as AnyProps));
}
