import { ComponentType, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { getSnapshot, subscribe } from "./state";
import { ToastsComponentProps } from "./types";

type ToasterProps = {
  ToastsComponent: ComponentType<ToastsComponentProps>;
  maxToasts?: number;
};

export function Toaster({
  ToastsComponent,
  maxToasts = 5,
}: Readonly<ToasterProps>) {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, () => []);

  // maxToasts 옵션만큼만 보여주도록 자르기
  if (maxToasts <= 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Toast] maxToasts 옵션은 0보다 큰 값을 권장드립니다. 0 이하로 설정하시면 토스트가 보이지 않습니다.",
      );
    }

    return null;
  }

  if (globalThis.window === undefined || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <ToastsComponent toasts={toasts.slice(0, maxToasts)} />,
    document.body,
  );
}
