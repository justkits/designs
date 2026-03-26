import { type HTMLAttributes } from "react";

import { Portal } from "@/core/portal";
import { ContentContext, useAlert } from "./internals/context";
import { styles } from "./internals/styles";

export function AlertContent({
  children,
  className,
  style,
  ...rest
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const {
    isOpen,
    titleId,
    descriptionId,
    contentId,
    wrapperRef,
    isPending,
    isPortalMode,
  } = useAlert();

  if (!isOpen) return null;

  const content = (
    <ContentContext.Provider value={true}>
      <div
        ref={wrapperRef}
        id={contentId}
        className={className}
        style={{ ...styles.alert, ...style }}
        role="alertdialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-pending={isPending ? "true" : undefined}
        aria-busy={isPending ? "true" : undefined}
        {...rest}
      >
        {children}
      </div>
    </ContentContext.Provider>
  );

  return <Portal isPortalMode={isPortalMode}>{content}</Portal>;
}
