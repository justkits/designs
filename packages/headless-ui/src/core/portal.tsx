import { type ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
  isPortalMode: boolean;
};

const subscribe = () => () => {};

/**
 * Portal로 렌더링 되는 컴포넌트를 감싸는 래퍼 컴포넌트.
 *  - 언제나 conditional이며,
 *  - SSR Guard를 포함한다. (서버 렌더링 및 hydration mismatch 방지)
 */
export function Portal({ children, isPortalMode }: PortalProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  // SSR Guard: 컴포넌트가 마운트되기 전에는 Portal 모드이더라도 children을 그대로 렌더링하여 hydration mismatch 방지
  if (!isPortalMode || !mounted) return children;

  return createPortal(children, document.body);
}
