import { type RefObject, createContext, useContext } from "react";

type ToastContextType = {
  isOpen: boolean;
  isPortalMode: boolean;
  showToast: () => void;
  dismissToast: () => void;
  resumeTimer: () => void;
  pauseTimer: () => void;
  isPending: boolean;
  setPending: (pending: boolean) => void;
  floatingRef: RefObject<HTMLDivElement | null>;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("Toast Components must be used within the Toast wrapper");
  }

  return context;
}

export const ContentContext = createContext<boolean>(false);
