import { type ReactNode } from "react";

import { styles } from "./styles.css";

type Props = {
  children: ReactNode;
};

export function PrimitivesLayout({ children }: Readonly<Props>) {
  return <div className={styles.page}>{children}</div>;
}
