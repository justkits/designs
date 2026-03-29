import { type RefObject, createContext, useContext } from "react";

import { type FloatingPlacement } from "@/core/placement/types";

type TooltipContextType = {
  // Open State
  disabled: boolean;
  isOpen: boolean;
  showTooltip: (delay?: number) => void;
  hideTooltip: (delay?: number) => void;
  // Portal 관련 상태
  isPortalMode: boolean;
  // ARIA 연결을 위한 id
  tooltipId: string;
  // 툴팁 동작 관련 상태
  openDelay: number;
  closeDelay: number;
  // 툴팁 위치 계산을 위한 상태
  placement: FloatingPlacement;
  x: number;
  y: number;
  shiftX: number;
  shiftY: number;
  // DOM 참조
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
};

export const TooltipContext = createContext<TooltipContextType | undefined>(
  undefined,
);

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error(
      "Tooltip Components must be used within the Tooltip wrapper",
    );
  }
  return context;
}

// Structure를 위한 Context (Tooltip.Content 내부에 렌더링 여부)
export const ContentContext = createContext(false);
