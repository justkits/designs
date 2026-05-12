import { SidebarProvider, Sidebar, SidebarNav } from "@justkits/ui/Sidebar";

import { kebabToTitleCase } from "@/shared/lib/strings";
import { getSidebarItems } from "./api/sidebar";
import { SidebarNode } from "./ui/SidebarNode";
import { styles } from "./styles.css";

type Props = {
  params: Promise<{ page: string }>;
  children: React.ReactNode;
};

export async function DocsLayout({ params, children }: Readonly<Props>) {
  const { page } = await params;

  const items = getSidebarItems(page);

  return (
    <SidebarProvider>
      <div className={styles.container}>
        <Sidebar className={styles.sidebar}>
          <SidebarNav
            aria-label={`${kebabToTitleCase(page)} Documentation Navigation`}
          >
            {items.map((item, idx) => (
              <SidebarNode key={`${item.label}-${idx}`} item={item} />
            ))}
          </SidebarNav>
        </Sidebar>
        <div className={styles.main}>
          {/* TODO: Breadcrumbs with sidebar toggle */}
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
