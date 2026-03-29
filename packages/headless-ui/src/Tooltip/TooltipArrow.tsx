import { type HTMLAttributes, useContext } from "react";

import { ContentContext, useTooltip } from "./internals/contexts";
import { styles } from "./internals/styles";

/**
 * 툴팁의 방향 화살표. `TooltipContent` 안에서 선택적으로 렌더한다.
 *
 * 수직 방향과 X축 보정값을 컨텍스트에서 자동으로 읽어 위치를 맞춘다.
 * `className`과 `style`로 스타일을 적용할 수 있다.
 * 스크린 리더에서는 숨김 처리된다 (`aria-hidden`).
 */
export function TooltipArrow({
  className,
  style,
  ...rest
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const { placement, shiftX, shiftY } = useTooltip();

  const isInsideContent = useContext(ContentContext);

  if (!isInsideContent) {
    throw new Error("Tooltip.Arrow must be used within Tooltip.Content");
  }

  return (
    <div
      style={{
        ...styles.arrow(placement, shiftX, shiftY),
        ...style,
      }}
      className={className}
      {...rest}
      aria-hidden="true"
    />
  );
}
