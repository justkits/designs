import { type HTMLAttributes, useContext } from "react";
import { createPortal } from "react-dom";

import { ContentContext, useAlert } from "./internals/context";
import { styles } from "./internals/styles";

type AlertOverlayProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export function AlertOverlay({
  className,
  style,
  ...rest
}: Readonly<AlertOverlayProps>) {
  const { isOpen, isPortalMode } = useAlert();

  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "Alert.Overlay should be rendered outside of Alert.Content. Please move Alert.Overlay outside of Alert.Content to avoid unexpected behavior.",
    );
  }

  if (!isOpen) return null;

  const overlay = (
    <div
      className={className}
      style={{ ...style, ...styles.overlay }}
      {...rest}
    />
  );

  return isPortalMode ? createPortal(overlay, document.body) : overlay;
}
