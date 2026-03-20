import { useState } from "react";

import { Tooltip } from "@/Tooltip";
import { FloatingPlacement } from "@/_placement";

export function TestComponent({
  content = "툴팁 메시지",
  position = "bottom",
  delay,
  arrow = false,
}: Readonly<{
  content?: string;
  position?: FloatingPlacement;
  delay?: number;
  arrow?: boolean;
}>) {
  return (
    <>
      <Tooltip delay={delay} position={position}>
        <Tooltip.Trigger data-testid="tooltip-trigger">트리거</Tooltip.Trigger>
        <Tooltip.Content data-testid="tooltip-content">
          {content}
          {arrow && <Tooltip.Arrow data-testid="tooltip-arrow" />}
        </Tooltip.Content>
      </Tooltip>
      <button data-testid="outside-button">외부 버튼</button>
    </>
  );
}

export function ControlledComponent({
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: Readonly<{
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip isOpen={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild data-testid="tooltip-trigger">
          <button
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            트리거
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content data-testid="tooltip-content">
          툴팁 메시지
        </Tooltip.Content>
      </Tooltip>
      <button
        data-testid="toggle-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        토글 툴팁
      </button>
    </>
  );
}
