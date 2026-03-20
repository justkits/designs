import {
  type ButtonHTMLAttributes,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type RefObject,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { useTooltip } from "./internals/main.context";

type TooltipTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-describedby" // override를 방지하기 위해 제거
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart" // useLongTouch 훅에서 직접 처리하므로 제거
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
  | "type"
> & {
  asChild?: boolean;
};

type AsChildTriggerProps = HTMLAttributes<HTMLElement> & {
  children: ReactElement<Record<string, unknown>>;
};

const AsChildTrigger = forwardRef<HTMLElement, AsChildTriggerProps>(
  function AsChildTrigger({ children, ...props }, ref) {
    return cloneElement(children, { ...props, ref });
  },
);

/**
 * 툴팁을 트리거하는 요소. 기본적으로 `<button>`으로 렌더된다.
 *
 * `asChild`를 사용하면 자식 요소에 트리거 동작을 위임한다.
 * 자식이 이미 `<button>`인 경우 중첩을 피하기 위해 사용한다.
 *
 * @param asChild - `true`이면 자식 요소를 트리거로 사용한다. 기본값 `false`.
 */
export function TooltipTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const { showTooltip, hideTooltip, tooltipId, triggerRef } = useTooltip();

  if (asChild) {
    if (isValidElement(children)) {
      const child = children as ReactElement<Record<string, unknown>>;
      return (
        <AsChildTrigger
          ref={triggerRef}
          aria-describedby={tooltipId}
          onMouseEnter={(e: MouseEvent<HTMLElement>) => {
            (
              child.props.onMouseEnter as
                | ((e: MouseEvent<HTMLElement>) => void)
                | undefined
            )?.(e);
            showTooltip();
          }}
          onMouseLeave={(e: MouseEvent<HTMLElement>) => {
            (
              child.props.onMouseLeave as
                | ((e: MouseEvent<HTMLElement>) => void)
                | undefined
            )?.(e);
            hideTooltip();
          }}
          onFocus={(e: FocusEvent<HTMLElement>) => {
            (
              child.props.onFocus as
                | ((e: FocusEvent<HTMLElement>) => void)
                | undefined
            )?.(e);
            showTooltip();
          }}
          onBlur={(e: FocusEvent<HTMLElement>) => {
            (
              child.props.onBlur as
                | ((e: FocusEvent<HTMLElement>) => void)
                | undefined
            )?.(e);
            hideTooltip();
          }}
          {...rest}
        >
          {child}
        </AsChildTrigger>
      );
    } else if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Tooltip.Trigger] `asChild` was set but the child is not a valid React element. Falling back to <button>.",
      );
    }
  }

  return (
    <button
      ref={triggerRef as RefObject<HTMLButtonElement>}
      aria-describedby={tooltipId}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
