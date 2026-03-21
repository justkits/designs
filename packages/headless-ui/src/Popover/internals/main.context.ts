import { type RefObject, createContext, useContext } from "react";

import { FloatingPlacement } from "@/_placement";

export type PopoverPlacement = Extract<FloatingPlacement, "top" | "bottom">;

type PopoverContextType = {
  isOpen: boolean;
  togglePopover: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDialogElement | null>;
  placement: PopoverPlacement;
  shiftX: number;
  shiftY: number;
  contentId: string;
};

export const PopoverContext = createContext<PopoverContextType | undefined>(
  undefined,
);

export function usePopover() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("usePopover must be used within Popover");
  }

  return context;
}
