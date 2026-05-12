export const dynamicParams = false;

export function generateStaticParams() {
  return [{ page: "primitives" }, { page: "design-system" }];
}

export { DocsLayout as default } from "@/pages/docs";
