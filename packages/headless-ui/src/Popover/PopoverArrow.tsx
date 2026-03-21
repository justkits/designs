import { HTMLAttributes } from "react";

import { usePopover } from "./internals/main.context";
import { usePopoverContent } from "./internals/content.context";
import { styles } from "./internals/styles";

export function PopoverArrow({
  className,
  style,
  ...rest
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const { placement, shiftX, shiftY } = usePopover();
  usePopoverContent(); // 콘텐츠 밖에서 사용되는 것을 방지하기 위한 훅 호출

  return (
    <div
      aria-hidden="true"
      style={{
        ...style,
        ...styles.arrow(placement, shiftX, shiftY),
      }}
      className={className}
      {...rest}
    />
  );
}
