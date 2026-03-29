import { type RefObject, createContext, useContext } from "react";

// #region Alert 전역 Context

type AlertStateType = {
  // Open State
  isOpen: boolean;
  showAlert: () => void;
  closeAlert: () => void;
  // Button 클릭 시 pending 상태 관리
  isPending: boolean;
  setPending: (pending: boolean) => void;
  // ARIA 연결을 위한 id
  titleId: string;
  descriptionId: string;
  contentId: string;
  // 포커스 트랩, 외부 클릭 감지 등 기능을 위한 DOM 참조 (포커스 트랩, 외부 클릭 감지 등)
  wrapperRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  // Portal 관련 상태
  isPortalMode: boolean;
};

export const AlertContext = createContext<AlertStateType | null>(null);

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("Alert Components must be used within the Alert wrapper");
  }

  return context;
}

// #endregion

// Structure를 위한 Context (Alert.Content 내부에 렌더링 여부)
export const ContentContext = createContext(false);
