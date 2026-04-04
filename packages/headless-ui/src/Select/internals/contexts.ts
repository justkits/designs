import {
  type CSSProperties,
  type RefObject,
  createContext,
  useContext,
} from "react";

type SelectContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  isOpen: boolean;
  showMenu: () => void;
  closeMenu: () => void;
  triggerId: string | undefined;
  setTriggerId: (id: string | undefined) => void;
  menuId: string | undefined;
  setMenuId: (id: string | undefined) => void;
  isPortalMode: boolean;
  containerStyles: CSSProperties;
  triggerRef: RefObject<HTMLButtonElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
};

export const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelect() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used within the Select wrapper");
  }

  return context;
}

export const TriggerContext = createContext<boolean>(false);
export const MenuContext = createContext<boolean>(false);
export const ItemContext = createContext<boolean>(false);
