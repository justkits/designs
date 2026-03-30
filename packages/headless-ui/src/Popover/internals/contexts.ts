import {
  type CSSProperties,
  type RefObject,
  createContext,
  useContext,
} from "react";

type PopoverContextValue = {
  isOpen: boolean;
  showPopover: () => void;
  hidePopover: () => void;
  isPortalMode: boolean;
  floatingStyles: { container: CSSProperties; arrow: CSSProperties };
  contentId: string;
  titleId: string;
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDialogElement | null>;
};

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopover() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(
      "Popover Components must be used within the Popover wrapper",
    );
  }

  return context;
}

// Structure를 위한 Context (Popover.Content 내부에 렌더링 여부)
export const ContentContext = createContext(false);
