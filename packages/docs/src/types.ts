// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JustkitsDocsFrontmatter {}

export type DocsLeaf = {
  type: "leaf";
  order: number;
  label: string;
  href: string;
  fields: JustkitsDocsFrontmatter;
};

export type DocsBranch = {
  type: "branch";
  order: number;
  label: string;
  href: string;
  children: DocsNode[];
  fields: JustkitsDocsFrontmatter;
};

export type DocsGroup = {
  type: "group";
  order: number;
  label: string;
  children: DocsNode[];
};

export type DocsNode = DocsLeaf | DocsBranch | DocsGroup;

export type SidebarItemProps = {
  item: DocsNode;
};
