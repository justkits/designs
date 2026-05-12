import { Collapsible } from "@justkits/headless-ui/Collapsible";

import { IconButton } from "@/atoms/Buttons";
import { Text } from "@/atoms/Texts";
import { styles } from "./styles.css";

interface SidebarSectionProps {
  children: React.ReactNode;
  label: string;
}

export function SidebarSection({
  children,
  label,
}: Readonly<SidebarSectionProps>) {
  return (
    <Collapsible>
      <div className={styles.wrapper}>
        <Text variant="bodySmall" className={styles.sectionLabel}>
          {label}
        </Text>
        <Collapsible.Toggle asChild>
          <IconButton
            className={styles.toggle}
            icon="chevron-right"
            size={16}
            animateIcon="rotate90"
          />
        </Collapsible.Toggle>
      </div>
      <Collapsible.Content role="group">
        <div className={styles.items}>{children}</div>
      </Collapsible.Content>
    </Collapsible>
  );
}
