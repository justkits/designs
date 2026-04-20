import { useSidebar } from "./contexts";

type Props = {
  children: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "aria-controls" | "aria-expanded"
>;

export function SidebarToggle({ children, ...rest }: Props) {
  const { isExpanded, toggleSidebar, contentId } = useSidebar();

  return (
    <button
      {...rest}
      onClick={toggleSidebar}
      aria-controls={contentId}
      aria-expanded={isExpanded}
      data-expanded={isExpanded}
    >
      {children}
    </button>
  );
}
