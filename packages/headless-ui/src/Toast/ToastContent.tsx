import { type HTMLAttributes, useRef } from "react";

import { Portal } from "@/core/portal";
import { zIndices } from "@/core/zindex";
import { ContentContext, useToast } from "./internals/contexts";

type ToastContentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "role"
  | "aria-live"
  | "aria-atomic"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
>;

export function ToastContent({
  children,
  className,
  style,
  ...rest
}: Readonly<ToastContentProps>) {
  const { isOpen, isPortalMode, pauseTimer, resumeTimer, floatingRef } =
    useToast();
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);

  if (!isOpen) return null;

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    pauseTimer();
  };
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (!isFocusedRef.current) resumeTimer();
  };
  const handleFocus = () => {
    isFocusedRef.current = true;
    pauseTimer();
  };
  const handleBlur = () => {
    isFocusedRef.current = false;
    if (!isHoveredRef.current) resumeTimer();
  };

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <div
          className={className}
          style={{ zIndex: zIndices.toast, ...style }}
          {...rest}
          ref={floatingRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
      </ContentContext.Provider>
    </Portal>
  );
}
