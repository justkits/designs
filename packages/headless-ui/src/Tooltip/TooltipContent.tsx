import { HTMLAttributes } from "react";

import { TooltipContentContext } from "./internals/content.context";
import { useTooltip } from "./internals/main.context";
import { styles } from "./internals/styles";

/**
 * 툴팁의 플로팅 콘텐츠 영역. 툴팁이 열린 상태에서만 렌더된다.
 *
 * 마운트 시 뷰포트 기준으로 수직 방향(위/아래)과 X축 위치를 자동으로 계산한다.
 * `className`과 `style`로 스타일을 적용할 수 있다.
 */
export function TooltipContent({
  children,
  className,
  style,
  ...rest
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const { isOpen, tooltipId, placement, shiftX, shiftY, floatingRef } =
    useTooltip();

  if (!isOpen) return null;

  return (
    <TooltipContentContext.Provider value={true}>
      <div
        ref={floatingRef}
        id={tooltipId}
        role="tooltip"
        aria-live="polite"
        style={{
          ...styles.tooltip(placement, shiftX, shiftY),
          ...style,
        }}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </TooltipContentContext.Provider>
  );
}
