import { type RefObject, createContext, useContext } from "react";

import { FloatingPlacement } from "@/_placement";

type TooltipContextType = {
  isOpen: boolean;
  showTooltip: (delay?: number) => void;
  hideTooltip: () => void;
  tooltipId: string;
  delay: number;
  placement: FloatingPlacement;
  shiftX: number;
  shiftY: number;
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
};

export const TooltipContext = createContext<TooltipContextType | undefined>(
  undefined,
);

export function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within Tooltip");
  }
  return context;
}
