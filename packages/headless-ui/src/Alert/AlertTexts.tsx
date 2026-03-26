import { type HTMLAttributes, useContext } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useAlert } from "./internals/context";

type AlertTitleProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;

export function AlertTitle({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<AlertTitleProps>) {
  const { titleId } = useAlert();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Alert.Title must be used within Alert.Content");
  }

  if (asChild) {
    return (
      <AsChild id={titleId} className={className} style={style} {...rest}>
        {children}
      </AsChild>
    );
  }

  return (
    <h2 id={titleId} className={className} style={style} {...rest}>
      {children}
    </h2>
  );
}

type AlertMessageProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

export function AlertMessage({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: Readonly<AlertMessageProps>) {
  const { descriptionId } = useAlert();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Alert.Message must be used within Alert.Content");
  }

  if (asChild) {
    return (
      <AsChild id={descriptionId} className={className} style={style} {...rest}>
        {children}
      </AsChild>
    );
  }

  return (
    <p id={descriptionId} className={className} style={style} {...rest}>
      {children}
    </p>
  );
}
