import { type HTMLAttributes } from "react";

import { Portal } from "@/core/portal";
import { ContentContext, useAlert } from "./internals/contexts";
import { styles } from "./internals/styles";

type AlertContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "role"
  | "id"
  | "tabIndex"
  | "aria-modal"
  | "aria-labelledby"
  | "aria-describedby"
  | "aria-busy"
>;

export function AlertContent({
  children,
  className,
  style,
  ...rest
}: Readonly<AlertContentProps>) {
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

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <div
          className={className}
          style={{ ...styles.alert, ...style }}
          {...rest}
          ref={wrapperRef}
          id={contentId}
          role="alertdialog"
          tabIndex={-1}
          aria-modal="true"
          aria-label={titleId ? undefined : "Alert"}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          aria-busy={isPending}
        >
          {children}
        </div>
      </ContentContext.Provider>
    </Portal>
  );
}
