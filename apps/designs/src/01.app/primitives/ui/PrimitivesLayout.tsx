import { type ReactNode } from "react";

import { Sidebar } from "@entities/sidebar";
import { styles } from "./styles.css";

type Props = {
  children: ReactNode;
};

export function PrimitivesLayout({ children }: Readonly<Props>) {
  return (
    <div className={styles.page}>
      <Sidebar />
      {children}
    </div>
  );
}
