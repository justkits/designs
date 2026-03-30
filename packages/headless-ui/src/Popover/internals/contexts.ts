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
  isPending: boolean;
  setPending: (pending: boolean) => void;
  isPortalMode: boolean;
  titleId: string | undefined;
  setTitleId: (id: string | undefined) => void;
  contentId: string | undefined;
  setContentId: (id: string | undefined) => void;
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDialogElement | null>;
  containerStyles: CSSProperties;
  arrowStyles: CSSProperties;
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
