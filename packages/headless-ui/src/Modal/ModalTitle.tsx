import { type HTMLAttributes, useContext, useId, useLayoutEffect } from "react";

import { AsChild } from "@/core/asChild";
import { ContentContext, useModal } from "./internals/contexts";

type ModalTitleProps = {
  asChild?: boolean;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "id">;

export function ModalTitle({
  children,
  className,
  style,
  asChild = false,
  ...rest
}: ModalTitleProps) {
  const titleId = useId();
  const { setTitleId } = useModal();

  useLayoutEffect(() => {
    setTitleId(titleId);
    return () => setTitleId(undefined);
  }, [titleId, setTitleId]);

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Modal.Title must be used within Modal.Content");
  }

  if (asChild) {
    return (
      <AsChild className={className} style={style} {...rest} id={titleId}>
        {children}
      </AsChild>
    );
  }

  return (
    <h2 className={className} style={style} {...rest} id={titleId}>
      {children}
    </h2>
  );
}
