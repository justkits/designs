import { type HTMLAttributes } from "react";

import { Portal } from "@/core/portal";
import { ContentContext, useTooltip } from "./internals/contexts";
import { styles } from "./internals/styles";

type TooltipContentProps = Omit<HTMLAttributes<HTMLDivElement>, "id" | "role">;

export function TooltipContent({
  children,
  className,
  style,
  ...rest
}: Readonly<TooltipContentProps>) {
  const {
    isOpen,
    tooltipId,
    x,
    y,
    floatingRef,
    isPortalMode,
    showTooltip,
    hideTooltip,
    closeDelay,
  } = useTooltip();

  if (!isOpen) return null;

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <div
          style={{
            ...styles.tooltip(x, y),
            ...style,
          }}
          className={className}
          {...rest}
          id={tooltipId}
          role="tooltip"
          ref={floatingRef}
          onMouseEnter={() => showTooltip(0)}
          onMouseLeave={() => hideTooltip(closeDelay)}
        >
          {children}
        </div>
      </ContentContext.Provider>
    </Portal>
  );
}
