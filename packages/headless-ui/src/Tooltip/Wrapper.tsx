import {
  type ReactNode,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { useClickOutside } from "@/_hooks/useClickOutside";
import { useFloatingPosition } from "@/_hooks/useFloatingPosition";
import { useKeyboardEvent } from "@/_hooks/useKeyboardEvent";
import { useLongTouch } from "@/_hooks/useLongTouch";
import { useOpenState } from "@/_hooks/useOpenState";
import { useTouchOutside } from "@/_hooks/useTouchOutside";
import { FloatingPlacement } from "@/_placement";
import { TooltipContext } from "./internals/main.context";
import { styles } from "./internals/styles";

type TooltipProps = {
  children: ReactNode;
  delay?: number;
  position?: FloatingPlacement;
} & (
  | { isOpen: boolean; onOpenChange: (open: boolean) => void }
  | { isOpen?: never; onOpenChange?: never }
);

/**
 * 툴팁의 상태와 위치를 관리하는 컨텍스트 프로바이더.
 * `TooltipTrigger`와 `TooltipContent`를 반드시 이 컴포넌트 안에서 사용해야 한다.
 *
 * @param delay - 툴팁이 표시되기까지의 지연 시간 (ms). 기본값 300.
 * @param isOpen - 제어 모드에서 툴팁의 열림 상태를 외부에서 지정한다.
 * @param onOpenChange - 툴팁 상태가 변경될 때 호출되는 콜백.
 */
export function Wrapper({
  children,
  delay = 300,
  position = "bottom",
  isOpen: controlledOpen,
  onOpenChange,
}: Readonly<TooltipProps>) {
  const {
    isOpen,
    show,
    hide: hideTooltip,
  } = useOpenState(controlledOpen, onOpenChange, false); // closeDelay는 0으로 고정
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  const { placement, shiftX, shiftY, updatePosition } = useFloatingPosition(
    triggerRef,
    floatingRef,
    position,
    isOpen,
  );

  useLayoutEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  const showWithDelay = useCallback(() => show(delay), [show, delay]);

  useLongTouch(wrapperRef, show, { isActive: !isOpen, delay: 500 }); // 롱터치는 터치 자체에 delay가 있기 때문에, show에 delay를 주지 않는다.
  useClickOutside(wrapperRef, hideTooltip, isOpen);
  useTouchOutside(wrapperRef, hideTooltip, isOpen);
  useKeyboardEvent("Escape", hideTooltip, isOpen);

  const contextValue = useMemo(
    () => ({
      isOpen,
      showTooltip: showWithDelay,
      hideTooltip,
      tooltipId,
      placement,
      shiftX,
      shiftY,
      triggerRef,
      floatingRef,
    }),
    [
      isOpen,
      showWithDelay,
      hideTooltip,
      tooltipId,
      placement,
      shiftX,
      shiftY,
      triggerRef,
      floatingRef,
    ],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <div ref={wrapperRef} style={styles.wrapper}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
}
